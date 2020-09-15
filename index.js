const { createModel, Model } = require('./managers/model');
const { createHandler} = require('./managers/handler');
const { createRoutes} = require('./managers/route');
module.exports.Model = Model;
module.exports.createModel = createModel;
module.exports.createHandler = createHandler;
module.exports.createRoutes = createRoutes;