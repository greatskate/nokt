require('dotenv').config();
const { createHandler } = require('noktjs');
/* Handlers Import Start */

/* Handlers Import End */

const create = async () => {
  process.chdir(__dirname);
};
module.exports.createRestHandlers = create;
/* Export REST */
