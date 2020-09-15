const { Client } = require('pg');

class [@modelName]{
    constructor(id, [@props]){
        this.id = id;
        [@propsDef]
    }
}

module.exports.[@modelName] = [@modelName];

const [@modelName]Model = {
    createTable: () => new Promise((succes, fail) => {
        [@createTable]
    }),
    insert: ([@props]) => new Promise((succes, fail) => {
        [@insert]
    }),
    select: (condition) => new Promise((succes, fail) => {
        [@select]
    }),
    update: (object, condition) => new Promise((succes, fail) => {
        [@update]
    }),
    delete: (condition) => new Promise((succes, fail) => {
        [@delete]
    })
}


module.exports.[@modelName]Model = [@modelName]Model;