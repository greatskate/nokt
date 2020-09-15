#!/usr/bin/env node
const {createProject} = require('./managers/builder');
let projectName = process.argv[2];
createProject(projectName);


