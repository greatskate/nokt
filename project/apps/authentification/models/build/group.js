const { Client } = require('pg');

class Group{
    constructor(id, name, is_admin){
        this.id = id;
        this.name = name; 
this.is_admin = is_admin; 

    }
}

module.exports.Group = Group;

const GroupModel = {
    createTable: () => new Promise((succes, fail) => {
        
        const CREATE_TABLE = `
            CREATE TABLE groups (
                id serial PRIMARY KEY, 
            name VARCHAR(50),
            is_admin BOOLEAN
            );
        `;
        const client = new Client();
        client.connect();
        client.query(CREATE_TABLE)
        .then(() => {
            client.end();
            succes();
        });
    
    }),
    insert: (name, is_admin) => new Promise((succes, fail) => {
        
        const INSERT = `
        INSERT INTO
            groups(name, is_admin)
        VALUES('${name}', ${is_admin});
        SELECT currval('groups_id_seq');
    `;
        const client = new Client();
        client.connect();
        client.query(INSERT)
            .then((res) => {
            client.end();
            succes(new Group(res[1].rows[0].currval,name, is_admin));
            })
            .catch((err) => {
            client.end();
            fail(err);
            });
    
    }),
    select: (condition) => new Promise((succes, fail) => {
        
        const SELECT = `
        SELECT
            id, name, is_admin
        FROM
            groups
        ${condition !== '' ? 'WHERE' : ''} ${condition};
        `;
        const client = new Client();
        client.connect();
        client.query(SELECT)
            .then((res) => {
            const objects = [];
            for (let i = 0; i < res.rows.length; i += 1) {
                objects.push(new Group(res.rows[i].id, res.rows[i].name, res.rows[i].is_admin));
            }
            client.end();
            succes(objects);
            })
            .catch((err) => {
            client.end();
            fail(err);
            });
    
    }),
    update: (object, condition) => new Promise((succes, fail) => {
        
            const UPDATE = `
            UPDATE groups
            SET
            ${Object.keys(object).map((key)=>`${key} = ${object[key]}`)}
            ${condition !== '' ? 'WHERE' : ''} ${condition};
        `;
            const client = new Client();
            client.connect();
            client.query(UPDATE)
                .then(() => {
                client.end();
                succes(object);
                })
                .catch((err) => {
                client.end();
                fail(err);
                });
    
    }),
    delete: (condition) => new Promise((succes, fail) => {
        
        const DELETE = `
        DELETE
        FROM
            groups
        ${condition !== '' ? 'WHERE' : ''} ${condition};
        `;
        const client = new Client();
        client.connect();
        client.query(DELETE)
            .then((res) => {
            client.end();
            succes();
            })
            .catch((err) => {
            client.end();
            fail(err);
            });
    
    })
}


module.exports.GroupModel = GroupModel;