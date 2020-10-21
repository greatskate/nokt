var fs = require('fs');


module.exports.createHandler = (model) => new Promise((succes, fail) => {
    fs.access(`build/${model.nameModel.toLowerCase()}.js`,(err)=>{
        if (err){
            fs.readFile(`${__dirname}/parse_file.js`,'utf8',(err,data)=>{
                if (err){
                    throw err;
                }
                let newData = parser(data, '[@modelName]', model.nameModel);
                newData = parser(newData,'[@modelProps]', getPropsReq(model));
                fs.writeFile(`build/${model.nameModel.toLowerCase()}.js`,newData,(err)=>{
                    if (err){
                        fail(err);
                    }
                    fs.readFile('./index.js','utf8',(err, data)=>{
                        if (err){
                            throw err;
                        }
                        if (data.includes('/* Handlers Import End */') && data.includes('/* Export REST */')){
                            const spliter = data.split('/* Handlers Import End */');
                            const subSpliter = spliter[1].split('/* Export REST */');
                            let newData = spliter[0] + `const { ${model.nameModel.charAt(0).toUpperCase() + model.nameModel.slice(1)}RestHandlers } = require('./build/${model.nameModel.toLowerCase()}');
/* Handlers Import End */` + subSpliter[0] + `module.exports.${model.nameModel.charAt(0).toUpperCase() + model.nameModel.slice(1)}RestHandlers = ${model.nameModel.charAt(0).toUpperCase() + model.nameModel.slice(1)}RestHandlers
/* Export REST */` + subSpliter[1];
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
            succes();
        }
    })
});

const getPropsReq = (model) => {
    attributes = Object.keys(model);
    attributesString = '';
    for (let i = 0; i<attributes.length ; i++){
        if (attributes[i] !== 'nameModel'){
            attributesString+= `req.body.${attributes[i]}, `
        }
    }
    if (attributesString.length > 2){
        attributesString = attributesString.slice(0,attributesString.length-2);
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
