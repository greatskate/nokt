# nokt
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
npx noktjs createApp [appName]
```

### Create Model

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
