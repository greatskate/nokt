const { createModel } = require('noktjs');
const { GroupTemplate } = require('./group');
const { UserTemplate } = require('./user');

/* Model Import Start */

const { Group, GroupModel } = require('./build/group');
const { User, UserModel } = require('./build/user');
/* Model Import End */

const create = async () =>{
  process.chdir(__dirname);
  await createModel(GroupTemplate);
  await createModel(UserTemplate);
}
const sync = () => new Promise((succes, fail) => {
    UserModel.createTable().then(()=>{
    /* Create Table */
})

  });
module.exports.sync = sync;
module.exports.createModels = create;
module.exports.Group = Group;
module.exports.GroupModel = GroupModel;


module.exports.User = User;
module.exports.UserModel = UserModel;

