const {createRestHandlers} = require('./handlers');
const {createModels} = require('./models');
module.exports.build = () => new Promise(async (succes, fail) => {
    await createRestHandlers();
    await createModels();
    succes();
});