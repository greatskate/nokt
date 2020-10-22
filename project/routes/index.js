const path = require('path');
const express = require('express');

/* Apps Routers import */
const Authentification = require('../apps/authentification/routes');
/* End Routers Import */

const router = express.Router();

const middleware = require('../middleware');

router.get('/', (req, res) => {
  res.render('index', {project:"[@]name"});
});

/* Apps Routers Use */
Authentification.routes(router, middleware);
/* End Routers Use */

module.exports = router;