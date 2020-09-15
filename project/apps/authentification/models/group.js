const { Model } = require('noktjs');

const GroupTemplate = {
    nameModel:"Group",
    name: Model.charfield(50),
    is_admin: Model.boolean(),
}

module.exports.GroupTemplate = GroupTemplate;