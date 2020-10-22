require('dotenv').config();
/* Import Models */
const AuthentificationBuilder = require('./apps/authentification/main');
/* End Import Models */

const build = () => new Promise((succes, fail) => {
    AuthentificationBuilder.build().then(()=>{
        /* AUTOMATIC SYNC */
    })
});

build();