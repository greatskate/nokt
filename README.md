# NoktJS >WORK IN PROGRESS<
A tool for REST API in nodejs and postgresql
==============================================

## How it works ?
### Create project
```shell
> npx noktjs create [project name]
```
### Create application
In you project directory:
```shell
> npx noktjs createApp [appName]
```

### Create Model

In the models directory in application.

*models/video.js*
```javascript
const {Model} = require('noktjs');

const VideoTemplate = {
  nameModel:'Video',
  title: Model.charfield(50),
  url: Model.charfield(100),
  description: Model.text(),
  views: Model.integer()
};
module.exports.VideoTemplate = VideoTemplate;
```

### Create Database model

*models/index.js*
```javascript
create = async ()=>{
/* Create model */
  await createModel(VideoTemplate);
}
```

### Create REST handler and routes from Template

*handlers/index.js*
```javascript
create = async ()=>{
/* Create model */
  await createHandler(VideoTemplate).then(async ()=>{
    await createRoutes(VideoTemplate, appName);
  });
}
```
### Configure Postgresql DB

*.env
```
PGUSER=dbuser
PGHOST=database.server.com
PGPASSWORD=secretpassword
PGDATABASE=mydb
PGPORT=3211
```

### Build Project
```shell
npm run build
```

### create DB
```shell
npm run create-db
```

### Start Project with Nodemon

```shell
> npm start
```

## What it does ?

It creates a complete REST API. Where all files are readable and editable for possible optimizations.
It also synchronizes the project files by directly editing the files concerned

