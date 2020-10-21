var fs = require('fs');
const { exec } = require("child_process");
const ora = require('ora');
const chalk = require('chalk');
var project = fs.readdirSync(__dirname+"/../../project",{withFileTypes:true});
var app = fs.readdirSync(__dirname+"/../../app",{withFileTypes:true});


async function createProject(projectName){
    
    console.log(`${chalk.green('------------------------------------------------------------')}`);
    console.log(`${chalk.green('|                                                          |')}`);
    console.log(`${chalk.green('|')}            ${chalk.blue('CREATING')} ${chalk.blue.bold(projectName.toUpperCase())} ${chalk.blue('PROJECT WITH')} ${chalk.blue.bold('NoktJS')} ${chalk.blue('!')}           ${chalk.green('|')}`);
    console.log(`${chalk.green('|                                                          |')}`);
    console.log(`${chalk.green('------------------------------------------------------------')}`);
    console.log('');
    await fs.mkdirSync(projectName)
    console.log(`${chalk.gray('Start files builder...')}`);
    await createHierarchy(projectName, "", project);
    console.log(`${chalk.green('End files builder !')}`);
    console.log('');
    await process.chdir('./'+projectName);
    const throbber = ora("Downloading dependencies...").start();
    executeShell("npm install express bcrypt body-parser cors dotenv jsonwebtoken pg")
    .then(()=>
        executeShell("npm install -g nodemon")
        .then(()=>{
            
            executeShell("npm install noktjs")
            throbber.stop();
            console.log(`${chalk.green('Dependencies Downloaded !')}`)
            console.log('');
            console.log(`${chalk.green('------------------------------------------------------------')}`);
            console.log(`${chalk.green('|                                                          |')}`);
            console.log(`${chalk.green('|')}               ${chalk.blue('READY TO CREATE AMAZING THINGS')}             ${chalk.green('|')}`);
            console.log(`${chalk.green('|                                                          |')}`);
            console.log(`${chalk.green('------------------------------------------------------------')}`);
        })
    )
}
async function createApp(appName){
    fs.mkdir('./apps/'+appName,async (err)=>{
        if (err){
            throw err;
        }
        await createHierarchyApp(appName, '', app)
        connectRouter(appName);
        connectDB(appName);
        connectBuilder(appName);
    });
}
/*
const createHierarchy = (projectName, path, dirs) => new Promise((succes, fail)=>{
    if (dirs.length === 0){
        return true;
    }
    else{
        for( let i=0; i<dirs.length; i++){
            let newPath = path+"/"+dirs[i].name;
            let newPathSource = __dirname+"/../../project/"+newPath;
            let newPathDestination = projectName+"/"+newPath;
            if (dirs[i].isDirectory()){
                fs.mkdir(newPathDestination, ()=>{
                    fs.readdir(newPathSource, {withFileTypes:true},(err, dirs)=>{
                        if (err){
                            fail();
                        }
                        else{
                            createHierarchy(projectName, newPath, dirs)
                                .then(()=>{

                                })
                        }
                    })
                });
            }
            else{
                fs.copyFile(newPathSource, newPathDestination, (err)=>{
                    if (err) throw err;
                })
            }
        }
    }
})
*/
async function createHierarchy(projectName,path,dirs){
    if(dirs.length===0){
      return true;
    }
    else{
      for(var i=0;i<dirs.length;i++){
        let newPath = path+"/"+dirs[i].name;
        let newPathSource = __dirname+"/../../project/"+newPath;
        let newPathDestination = projectName+"/"+newPath;
        if (dirs[i].isDirectory()){
          await fs.mkdirSync(newPathDestination);
          
          console.log(`${chalk.magenta(`- directory ${newPathDestination} created`)}`);
          await createHierarchy(projectName,newPath,await fs.readdirSync(newPathSource,{withFileTypes:true}));
        }
        else{
            await fs.copyFileSync(newPathSource,newPathDestination);
            
            console.log(`${chalk.yellow(`- file ${newPath} created`)}`);
            const data = await fs.readFileSync(newPathDestination,'utf8')
            let newData="";
            if (data.includes("[@]name")){
            let newStrings = data.split("[@]name");
            for(let i=0;i<newStrings.length-1;i++){
                newData += newStrings[i]+projectName;
            }

            newData += newStrings[newStrings.length-1];
            await fs.writeFileSync(newPathDestination,newData);
            }
        }
      }
    }
  }
  
async function createHierarchyApp(appName,path,dirs){
    if(dirs.length===0){
      return true;
    }
    else{
      for(var i=0;i<dirs.length;i++){
        let newPath = path+"/"+dirs[i].name;
        let newPathSource = __dirname+"/../../app/"+newPath;
        let newPathDestination = "apps/"+ appName+"/"+newPath;
        if (dirs[i].isDirectory()){
          await fs.mkdirSync(newPathDestination);
          
          console.log(`${chalk.magenta(`- directory ${newPathDestination} created`)}`);
          await createHierarchyApp(appName,newPath,await fs.readdirSync(newPathSource,{withFileTypes:true}));
        }
        else{
            await fs.copyFileSync(newPathSource,newPathDestination);
            
            console.log(`${chalk.yellow(`- file ${newPath} created`)}`);
            const data = await fs.readFileSync(newPathDestination,'utf8')
            let newData="";
            if (data.includes("[@appName]")){
                let newStrings = data.split("[@appName]");
                for(let i=0;i<newStrings.length-1;i++){
                    newData += newStrings[i]+appName;
                }

                newData += newStrings[newStrings.length-1];
                await fs.writeFileSync(newPathDestination,newData);
            }
        }
        }
      }
  }

const executeShell = (command) => new Promise((succes, fail)=>{
    exec(command, (error, stdout, stderr)=>{
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {

        }
        succes();
    }
    );

})

const connectRouter = (app) => new Promise((succes, fail)=>{
    fs.readFile('./routes/index.js','utf8',(err, data)=>{
        if (err){
            throw err;
        }
        if (data.includes('/* End Routers Import */') && data.includes('/* End Routers Use */')){
            const spliter = data.split('/* End Routers Import */')
            const subSpliter = spliter[1].split('/* End Routers Use */');
            let newData = spliter[0] + `const ${app.charAt(0).toUpperCase() + app.slice(1)} = require('../apps/${app}/routes');
/* End Routers Import */` + subSpliter[0] + `${app.charAt(0).toUpperCase() + app.slice(1)}.routes(router, middleware);
/* End Routers Use */` + subSpliter[1];
            fs.writeFile('./routes/index.js',newData,(err)=>{
                if (err){
                    fail(err);
                    throw err;
                }
                succes();
            });
        }
        else{
            fail("Balise End Routers or End Routers Use Import not found !")
        }
    })
});
const connectDB = (app) => new Promise((succes, fail)=>{
    fs.readFile('./db.js','utf8',(err, data)=>{
        if (err){
            throw err;
        }
        if (data.includes('/* End Import Models */') && data.includes('/* AUTOMATIC SYNC */')){
            const spliter = data.split('/* End Import Models */')
            const subSpliter = spliter[1].split('/* AUTOMATIC SYNC */');
            let newData = spliter[0] + `const ${app.charAt(0).toUpperCase() + app.slice(1)}Models = require('./apps/${app}/models');
/* End Import Models */` + subSpliter[0] + `${app.charAt(0).toUpperCase() + app.slice(1)}Models.sync().then(
    ()=>{
        /* AUTOMATIC SYNC */
    }
);` + subSpliter[1];
            fs.writeFile('./db.js',newData,(err)=>{
                if (err){
                    fail(err);
                    throw err;
                }
                succes();
            });
        }
        else{
            fail("Balise End Import Models or AUTOMATIC SYNC not found !")
        }
    })
});
const connectBuilder = (app) => new Promise((succes, fail)=>{
    fs.readFile('./build.js','utf8',(err, data)=>{
        if (err){
            throw err;
        }
        if (data.includes('/* End Import Models */') && data.includes('/* AUTOMATIC SYNC */')){
            const spliter = data.split('/* End Import Models */')
            const subSpliter = spliter[1].split('/* AUTOMATIC SYNC */');
            let newData = spliter[0] + `const ${app.charAt(0).toUpperCase() + app.slice(1)}Builder = require('./apps/${app}/main');
/* End Import Models */` + subSpliter[0] + `${app.charAt(0).toUpperCase() + app.slice(1)}Builder.build().then(
    ()=>{
        /* AUTOMATIC SYNC */
    }
);` + subSpliter[1];
            fs.writeFile('./build.js',newData,(err)=>{
                if (err){
                    fail(err);
                    throw err;
                }
                succes();
            });
        }
        else{
            fail("Balise End Import Models or AUTOMATIC SYNC not found !")
        }
    })
});

module.exports.createProject = createProject;
module.exports.createApp = createApp;