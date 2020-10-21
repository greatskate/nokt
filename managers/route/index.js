const chalk = require('chalk');
var fs = require('fs');
module.exports.createRoutes = (model, appName) => new Promise((succes, fail) => {
            fs.readFile(`${__dirname}/parse_file.js`,'utf8',(err,data)=>{
                if (err){
                    throw err;
                }
                let routes = parser(data, '[@modelName]', model.nameModel);
                routes = parser(routes, '[@routeName]', model.nameModel.toLowerCase()+'s');
                routes = parser(routes,'[@appName]', appName);
                    fs.readFile('../routes.js','utf8',(err, data)=>{
                        if (err){
                            throw err;
                        }
                        if (data.includes('/* END REST ROUTES */') && data.includes('/* END REST HANDLERS */')){
                            const spliter = data.split('/* END REST HANDLERS */');
                            if (!spliter[0].includes(`const { ${model.nameModel.charAt(0).toUpperCase() + model.nameModel.slice(1)}RestHandlers } = require('./handlers');`)){
                                const subSpliter = spliter[1].split('/* END REST ROUTES */');
                                let newData = spliter[0] + `const { ${model.nameModel.charAt(0).toUpperCase() + model.nameModel.slice(1)}RestHandlers } = require('./handlers');
    /* END REST HANDLERS */` + subSpliter[0] + routes + `
    /* END REST ROUTES */` + subSpliter[1];
                                fs.writeFile('../routes.js', newData, (err)=>{
                                    if (err){
                                        throw err;
                                    }
                                    if (!appName){
                                        chalk.red('Appname was not defined, You need to rename your route in routes files!')
                                    }
                                    succes();
                                });
                            }
                            else{
                                succes();
                            }
                        }
                    })
                })
});
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
