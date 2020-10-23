const express = require('express');
const {GroupModel, UserModel } = require('../apps/authentification/models');

/* Apps Routers import */
const Authentification = require('../apps/authentification/routes');
/* End Routers Import */

const router = express.Router();

const middleware = require('../middleware');

router.get('/', (req, res) => {
  GroupModel.select("name='Admin'").then((groups) => {
    UserModel.select(`group_id=${groups[0].id}`).then((users) => {
      const hasAdmin = users.length > 0;
      res.render('index', { project: '[@]name', hasAdmin });
    });
  });
});

/* Apps Routers Use */
Authentification.routes(router, middleware);
/* End Routers Use */

module.exports = router;
