const { createModel } = require('noktjs');

/* Model Import Start */

/* Model Import End */

const create = async () =>{
  process.chdir(__dirname);
}
const sync = () => new Promise(async (succes, fail) => {
    /* Create Table */
    succes();
  });
module.exports.sync = sync;
module.exports.createModels = create;