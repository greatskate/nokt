#!/usr/bin/env node
const {createApp} = require('./managers/builder');
let AppName = process.argv[2];
createApp(AppName);


