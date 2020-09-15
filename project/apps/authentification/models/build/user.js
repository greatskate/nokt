const { Client } = require('pg');

class User{
    constructor(id, pseudo, email, password, last_name, first_name, group){
        this.id = id;
        this.pseudo = pseudo; 
this.email = email; 
this.password = password; 
this.last_name = last_name; 
this.first_name = first_name; 
this.group = group; 

    }
}

module.exports.User = User;

const UserModel = {
    createTable: () => new Promise((succes, fail) => {
        
        const CREATE_TABLE = `
            CREATE TABLE users (
                id serial PRIMARY KEY, 
            pseudo VARCHAR(50),
            email VARCHAR(100),
            password TEXT,
            last_name VARCHAR(50),
            first_name VARCHAR(50),
            group INTEGER REFERENCES groups(id)
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
    insert: (pseudo, email, password, last_name, first_name, group) => new Promise((succes, fail) => {
        
        const INSERT = `
        INSERT INTO
            users(pseudo, email, password, last_name, first_name, group)
        VALUES('${pseudo}', '${email}', '${password}', '${last_name}', '${first_name}', ${group});
        SELECT currval('users_id_seq');
    `;
        const client = new Client();
        client.connect();
        client.query(INSERT)
            .then((res) => {
            client.end();
            succes(new User(res[1].rows[0].currval,pseudo, email, password, last_name, first_name, group));
            })
            .catch((err) => {
            client.end();
            fail(err);
            });
    
    }),
    select: (condition) => new Promise((succes, fail) => {
        
        const SELECT = `
        SELECT
            id, pseudo, email, password, last_name, first_name, group
        FROM
            users
        ${condition !== '' ? 'WHERE' : ''} ${condition};
        `;
        const client = new Client();
        client.connect();
        client.query(SELECT)
            .then((res) => {
            const objects = [];
            for (let i = 0; i < res.rows.length; i += 1) {
                objects.push(new User(res.rows[i].id, res.rows[i].pseudo, res.rows[i].email, res.rows[i].password, res.rows[i].last_name, res.rows[i].first_name, res.rows[i].group));
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
            UPDATE users
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
            users
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


module.exports.UserModel = UserModel;