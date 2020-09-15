const Handler = require('./handlers');
const { builder } = require('./main');
/* IMPORT REST HANDLERS */
/* END REST HANDLERS */

builder();
const routes = (router, middleware) => {
    router.get('/authentification/',(req,res) => {
        res.send('authentification routes Works !')
    })
    /* REST ROUTES */
    /* END REST ROUTES */
};

module.exports.routes = routes;