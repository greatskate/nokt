/* Import Models */
const AuthentificationModels = require('./apps/authentification/models');
/* End Import Models */

module.exports.create = () => new Promise((succes, fail) => {
    AuthentificationModels.sync().then(()=>{
        /* AUTOMATIC SYNC */
    })
});