
var fs = require('fs');

var directories = fs.readdirSync(__dirname+"/projects_files",{withFileTypes:true});

module.exports.test=async function(projectName){

  await fs.mkdirSync(projectName);
  await createHierarchy(projectName,"",directories);
  await console.log( "------- Nokt Project Created -------");
  await console.log( "cd "+projectName);
  await console.log( "npm install");
  await console.log( "npm start");
  await console.log( "------------------------------------");
}


async function createHierarchy(projectName,path,dirs){
  if(dirs.length===0){
    return true;
  }
  else{
    for(var i=0;i<dirs.length;i++){
      let newPath = path+"/"+dirs[i].name;
      let newPathSource = __dirname+"/projects_files/"+newPath;
      let newPathDestination = projectName+"/"+newPath;
      if (dirs[i].isDirectory()){
        await fs.mkdirSync(newPathDestination);
        await createHierarchy(projectName,newPath,await fs.readdirSync(newPathSource,{withFileTypes:true}));
      }
      else{
        await fs.copyFile(newPathSource,newPathDestination,async (err)=>{
          if (err) throw err;
          console.log("- file "+newPath+" has been created");
          await fs.readFile(newPathDestination,'utf8', async function(err, data) {
            let newData="";
            if (data.includes("[@]name")){
              let newStrings = data.split("[@]name");
              for(let i=0;i<newStrings.length-1;i++){
                newData += newStrings[i]+projectName;
              }

              newData += newStrings[newStrings.length-1];
              await fs.writeFile(newPathDestination,newData,function (err) {
                if (err) throw err;
              })
            }
            return true;
          });

        })
      }
    }
  }
}

function createDirectories(projectName){
  fs.mkdirSync(projectName);
  fs.mkdirSync(projectName+"/handlers");
  fs.mkdirSync(projectName+"/managers");
  fs.mkdirSync(projectName+"/models");
  fs.mkdirSync(projectName+"/utils");
  fs.readdir(projectName,{withFileTypes:true},(err,files)=>{
    for (var i =0; i<files.length;i++){
      console.log("-"+files[i]);
    }
  })
}
