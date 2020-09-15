const path = require('path');
const express = require('express');

/* Apps Routers import */

/* End Routers Import */

const router = express.Router();

const middleware = require('../middleware');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname)+'/html/index.html');
});

/* Apps Routers Use */

/* End Routers Use */

module.exports = router;