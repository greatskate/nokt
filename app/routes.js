const Handler = require('./handlers');
const { builder } = require('./main');
/* IMPORT REST HANDLERS */
/* END REST HANDLERS */

const routes = (router, middleware) => {
    router.get('/[@appName]/',(req,res) => {
        res.send('[@appName] routes Works !')
    })
    /* REST ROUTES */
    /* END REST ROUTES */
};

module.exports.routes = routes;