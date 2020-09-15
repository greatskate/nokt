const {createRestHandlers} = require('./handlers');
const {createModels} = require('./models');
module.exports.builder = async () =>{
    await createRestHandlers();
    await createModels();
} 