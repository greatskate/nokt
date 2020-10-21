#!/usr/bin/env node
const {createApp} = require('./managers/builder');
const {createProject} = require('./managers/builder');
let command = process.argv[2];
let AppName = process.argv[3];
switch (command){
    case "create":
        createProject(AppName);
        break;
    case "create-app":
        createApp(AppName);
        break;
    default:
        console.error("Command not found");
}


