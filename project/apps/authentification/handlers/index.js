require('dotenv').config();
const { createHandler } = require('noktjs');
const { createRoutes } = require('noktjs/managers/route');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/index');
const { GroupModel } = require('../models/build/group');
const { UserTemplate } = require('../models/user');
/* Handlers Import Start */
const { UserRestHandlers } = require('./build/user');
/* Handlers Import End */

const create = async () => {
  process.chdir(__dirname);
  await createHandler(UserTemplate).then(async () => {
    await createRoutes(UserTemplate);
  });
};

const auth = (req, res) => {
  const { email, password } = req.body;
  UserModel.select(`email = '${email}'`)
    .then((users) => {
      if (users.length > 0) {
        const user = users[0];
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            const userInfo = user;
            userInfo['password'] = null;
            GroupModel.select(`id = ${user.group_id}`).then((group) => {
              userInfo['is_admin'] = group[0].is_admin;
              const token = generateAccessToken(userInfo.tokenFormat());
              res.send({ user: userInfo, token });
            });
          } else {
            res.status(404).send('Bad Password');
          }
        });
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(err.detail);
    });
};

const authGet = (req, res) => {
  res.send(req.user);
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}
module.exports.createRestHandlers = create;
module.exports.auth = auth;
module.exports.authGet = authGet;
module.exports.UserRestHandlers = UserRestHandlers;
/* Export REST */
