var fs = require('fs');

module.exports.createObject = (object) => {
    throw 'Not implemented';
}


module.exports.createModel = (model) => new Promise((succes, fail) => {
    fs.access(`build/${model.nameModel.toLowerCase()}.js`,(err)=>{
        if (err){
            fs.readFile(`${__dirname}/parse_file.js`,'utf8',(err,data)=>{
                if (err){
                    throw err;
                }
                let newData = parser(data, '[@modelName]', model.nameModel);
                newData = parser(newData,'[@props]', getProps(model));
                newData = parser(newData,'[@propsDef]', getPropsDef(model));
                newData = parser(newData,'[@createTable]', createTable(model));
                newData = parser(newData,'[@insert]', insert(model));
                newData = parser(newData,'[@select]', select(model));
                newData = parser(newData,'[@update]', update(model));
                newData = parser(newData,'[@delete]', deleteObject(model));
                fs.writeFile(`build/${model.nameModel.toLowerCase()}.js`,newData,(err)=>{
                    if (err){
                        fail(err);
                    }
                    fs.readFile('./index.js','utf8',(err, data)=>{
                        if (err){
                            throw err;
                        }
                        if (data.includes('/* Model Import End */') && data.includes('/* Create Table */')){
                            const spliter = data.split('/* Model Import End */')
                            const subSpliter = spliter[1].split('/* Create Table */');
                            let newData = spliter[0] + `const { ${model.nameModel.charAt(0).toUpperCase() + model.nameModel.slice(1)}, ${model.nameModel.charAt(0).toUpperCase() + model.nameModel.slice(1)}Model } = require('./build/${model.nameModel.toLowerCase()}');
/* Model Import End */` + subSpliter[0] + `${model.nameModel.charAt(0).toUpperCase() + model.nameModel.slice(1)}Model.createTable().then(()=>{
    /* Create Table */
})
` + subSpliter[1] +`
module.exports.${model.nameModel} = ${model.nameModel};
module.exports.${model.nameModel}Model = ${model.nameModel}Model;

`;
                            fs.writeFile('./index.js', newData, (err)=>{
                                if (err){
                                    throw err;
                                }
                                succes();
                            });
                        }
                    })
                });
            });
        }
        else{

        }
    })
});

const deleteObject = (model) => {
    let modelString = `
        const DELETE = \`
        DELETE
        FROM
            ${model.nameModel.toLowerCase()}s
        \${condition !== '' ? 'WHERE' : ''} \${condition};
        \`;
        const client = new Client();
        client.connect();
        client.query(DELETE)
            .then((res) => {
            client.end();
            succes();
            })
            .catch((err) => {
            client.end();
            fail(err);
            });
    `
    return modelString;
}

const update = (model) => {
    let modelString = `
            const UPDATE = \`
            UPDATE ${model.nameModel.toLowerCase()}s
            SET
            \${Object.keys(object).map((key)=>\`\${key} = \${object[key]}\`)}
            \${condition !== '' ? 'WHERE' : ''} \${condition};
        \`;
            const client = new Client();
            client.connect();
            client.query(UPDATE)
                .then(() => {
                client.end();
                succes(object);
                })
                .catch((err) => {
                client.end();
                fail(err);
                });
    `
    return modelString;
}
const select = (model) => {
    let modelString = `
        const SELECT = \`
        SELECT
            id, ${getProps(model)}
        FROM
            ${model.nameModel.toLowerCase()}s
        \${condition !== '' ? 'WHERE' : ''} \${condition};
        \`;
        const client = new Client();
        client.connect();
        client.query(SELECT)
            .then((res) => {
            const objects = [];
            for (let i = 0; i < res.rows.length; i += 1) {
                objects.push(new ${model.nameModel}(res.rows[i].id, ${getPropsRows(model)}));
            }
            client.end();
            succes(objects);
            })
            .catch((err) => {
            client.end();
            fail(err);
            });
    `
    return modelString;
}
const insert = (model) => {
    let modelString = `
        const INSERT = \`
        INSERT INTO
            ${model.nameModel.toLowerCase()}s(${getProps(model)})
        VALUES(${getPropsValue(model)});
        SELECT currval('${model.nameModel.toLowerCase()}s_id_seq');
    \`;
        const client = new Client();
        client.connect();
        client.query(INSERT)
            .then((res) => {
            client.end();
            succes(new ${model.nameModel}(res[1].rows[0].currval,${getProps(model)}));
            })
            .catch((err) => {
            client.end();
            fail(err);
            });
    `
    return modelString;
}
const createTable = (model) => {
    let modelString = `
        const CREATE_TABLE = \`
            CREATE TABLE ${model.nameModel.toLowerCase()}s (
                id serial PRIMARY KEY, \n`
        for (attribute in model){
            if (attribute !== 'nameModel'){
                modelString += `            ${attribute} ${parseProp(model[attribute])},\n`
            }
        }
        modelString = modelString.slice(0, modelString.length-2);
        modelString += `
            );
        \`;
        const client = new Client();
        client.connect();
        client.query(CREATE_TABLE)
        .then(() => {
            client.end();
            succes();
        });
    `
    return modelString;
}

const parseProp = (attribute) =>{
    switch(attribute.type){
        case Type.INTEGER:
            return 'INTEGER'
        case Type.CHARFIELD:
            return `VARCHAR(${attribute.maxLength})`
        case Type.FLOAT:
            return 'FLOAT';
        case Type.TEXT:
            return 'TEXT';
        case Type.FOREIGNKEY:
            return `INTEGER REFERENCES ${attribute.model.nameModel.toLowerCase()}s(id)`;
        case Type.BOOLEAN:
            return `BOOLEAN`;
        case Type.DATE:
            return 'DATE';
    }
}

const getPropsUpdate = (model) => {
    attributes = Object.keys(model);
    attributesString = '';
    for (let i = 0; i<attributes.length ; i++){
        if (attributes[i] !== 'nameModel'){
            if (model[attributes[i]].type === Type.CHARFIELD
                || model[attributes[i]].type === Type.TEXT){
                attributesString+= `\${object.${attributes[i]} ? \`${attributes[i]} = '\${object.${attributes[i]}}',\`: ''}'\n`
            }
            else{
                attributesString+= `\${object.${attributes[i]} ? \`${attributes[i]} = \${object.${attributes[i]}},\`: ''}'\n`
            }
        }
    }
    if (attributesString.length > 2){
        attributesString = attributesString.slice(0,attributesString.length-2);
    }
    return attributesString;
}

const getPropsValue = (model) => {
    attributes = Object.keys(model);
    attributesString = '';
    for (let i = 0; i<attributes.length ; i++){
        if (attributes[i] !== 'nameModel'){
            if (model[attributes[i]].type === Type.CHARFIELD
                || model[attributes[i]].type === Type.TEXT){

                attributesString+= `'\${${attributes[i]}}', `
            }
            else{
                attributesString+= `\${${attributes[i]}}, `
            }
        }
    }
    if (attributesString.length > 2){
        attributesString = attributesString.slice(0,attributesString.length-2);
    }
    return attributesString;
}
const getPropsRows = (model) => {
    attributes = Object.keys(model);
    attributesString = '';
    for (let i = 0; i<attributes.length ; i++){
        if (attributes[i] !== 'nameModel'){
            attributesString+= `res.rows[i].${attributes[i]}, `
        }
    }
    if (attributesString.length > 2){
        attributesString = attributesString.slice(0,attributesString.length-2);
    }
    return attributesString;
}
const getProps = (model) => {
    attributes = Object.keys(model);
    attributesString = '';
    for (let i = 0; i<attributes.length ; i++){
        if (attributes[i] !== 'nameModel'){
            attributesString+= attributes[i]+', '
        }
    }
    if (attributesString.length > 2){
        attributesString = attributesString.slice(0,attributesString.length-2);
    }
    return attributesString;
}
const getPropsDef = (model) => {
    attributes = Object.keys(model);
    attributesString = '';
    for (let i = 0; i<attributes.length ; i++){
        if (attributes[i] !== 'nameModel'){
            attributesString+= `this.${attributes[i]} = ${attributes[i]}; \n`
        }
    }
    return attributesString;
}

const parser = (data, tag, replace) => {
    let newData = data;
    if (data.includes(tag)){
        newData = '';
        let newStrings = data.split(tag);
        for(let i=0;i<newStrings.length-1;i++){
            newData += newStrings[i]+replace;
        }
        newData += newStrings[newStrings.length-1];
    }
    return newData;
}

const Type = {
    INTEGER: 'INTEGER',
    CHARFIELD: 'CHARFIELD',
    FLOAT: 'FLOAT',
    TEXT: 'TEXT',
    FOREIGNKEY: 'FOREIGNKEY',
    MANYTOMANY: 'MANYTOMANY',
    BOOLEAN: 'BOOLEAN',
    DATE: 'DATE'
}

module.exports.Model = {
    integer : (options)=> {return {type: Type.INTEGER, options: options}},
    charfield: (maxLength, options) =>{return{type: Type.CHARFIELD, maxLength: maxLength, options: options}},
    float : (options)=> {return {type: Type.FLOAT, options: options}},
    text : (options) => {return {type: Type.TEXT, options: options}},
    foreignKey: (model, options) =>{return {type: Type.FOREIGNKEY, model: model, options: options}},
    manyToMany: (model, options) =>{return {type: Type.MANYTOMANY, model: model, options: options}},
    boolean: (options) =>{return {type: Type.BOOLEAN, options: options}},
    date: (options) =>{return {type: Type.DATE, options: options}}
}