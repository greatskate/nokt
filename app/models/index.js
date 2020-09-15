const { createModel } = require('noktjs');

/* Model Import Start */

/* Model Import End */

const create = async () =>{
  process.chdir(__dirname);
}
const sync = () => new Promise((succes, fail) => {
    /* Create Table */
  });
module.exports.sync = sync;
module.exports.createModels = create;