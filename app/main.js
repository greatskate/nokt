const { createRestHandlers } = require('./handlers');
const { createModels } = require('./models');

module.exports.build = () => new Promise(async (succes) => {
  await createRestHandlers();
  await createModels();
  succes();
});
