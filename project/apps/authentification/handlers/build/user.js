const { UserModel, GroupModel } = require('../../models');

const UserRestHandlers = {
  get: (req, res) => {
    UserModel.select('')
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        throw err;
      });
  },
  getOne: (req, res) => {
    UserModel.select(`id = ${req.params.id}`)
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        throw err;
      });
  },
  post: (req, res) => {
    UserModel.insert(
      req.body.pseudo,
      req.body.email,
      req.body.password,
      req.body.last_name,
      req.body.first_name,
      req.body.group_id,
    )
      .then((object) => {
        res.send(object);
      })
      .catch((err) => {
        throw err;
      });
  },
  createSuperUser: (req, res) => {
    console.log(req.body);
    GroupModel.select("name='Admin'").then((groups) => {
      UserModel.select(`group_id=${groups[0].id}`).then((users) => {
        if (users.length === 0) {
          UserModel.insert(
            req.body.pseudo,
            req.body.email,
            req.body.password,
            req.body.last_name,
            req.body.first_name,
            groups[0].id,
          )
            .then((object) => {
              res.send(object);
            })
            .catch((err) => {
              throw err;
            });
        }
      });
    });
  },
  put: (req, res) => {
    UserModel.update(req.body, `id = ${req.params.id}`)
      .then((object) => {
        res.send(object);
      })
      .catch((err) => {
        throw err;
      });
  },
  delete: (req, res) => {
    UserModel.delete(`id = ${req.params.id}`)
      .then(() => {
        res.send({});
      })
      .catch((err) => {
        throw err;
      });
  },
};

module.exports.UserRestHandlers = UserRestHandlers;
