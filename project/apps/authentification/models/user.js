const { Model } = require('noktjs');
const { GroupTemplate } = require('./group');

const UserTemplate = {
    nameModel:"User",
    pseudo: Model.charfield(50),
    email: Model.charfield(100),
    password: Model.text(),
    last_name: Model.charfield(50),
    first_name: Model.charfield(50),
    group_id: Model.foreignKey(GroupTemplate)
}

module.exports.UserTemplate = UserTemplate;