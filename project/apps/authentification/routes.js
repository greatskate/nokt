const Handler = require('./handlers');
const { builder } = require('./main');
/* IMPORT REST HANDLERS */
const { UserRestHandlers } = require('./handlers');
/* END REST HANDLERS */

builder();
const routes = (router, middleware) => {
    router.get('/authentification/',(req,res) => {
        res.send('authentification routes Works !')
    })
    router.post('/auth/', Handler.auth);
    router.get('/auth/',middleware.logged, Handler.authGet);
    /* REST ROUTES */
    router.get('/authentification/users/', middleware.admin, UserRestHandlers.get);
    router.get('/authentification/users/:id', middleware.admin, UserRestHandlers.getOne);
    router.put('/authentification/users/:id', middleware.admin, UserRestHandlers.put);
    router.post('/authentification/users/', UserRestHandlers.post);
    router.delete('/authentification/users/:id', middleware.admin, UserRestHandlers.delete);
    /* END REST ROUTES */
};

module.exports.routes = routes;