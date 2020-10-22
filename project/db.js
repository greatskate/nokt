require('dotenv').config();
/* Import Models */
const AuthentificationModels = require('./apps/authentification/models');
/* End Import Models */

const create = () => new Promise((succes, fail) => {
    AuthentificationModels.sync().then(()=>{
        /* AUTOMATIC SYNC */
    })
});

create();