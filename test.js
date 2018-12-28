#!/usr/bin/env node
var pgm = require(".");
var fs = require('fs');

/*
class TestObject extends pgm.DatabaseObject{
  constructor(){
    super();
    console.log(pgm)
    this.name=pgm.props.CharField({length:20,default:"Test"});
  }
}


var testObject = new TestObject();
console.log(testObject);
*/
let projectName = process.argv[2];
/*
console.log(process.argv[1]);
fs.realpath.native(".",(err,data)=>{
  console.log(data);
});
*/
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
/*
createDirectories(projectName);
*/
pgm.test(projectName);
/*
fs.readFile("index.js",(err,data) => {
  if (err) throw err;
  console.log(data);
});
if (!fs.existsSync(projectName)){
  fs.mkdirSync(projectName);
  console.log("Starting creating: "+projectName);
}
else{
  console.log("a directory with this name already exist")
}

*/
