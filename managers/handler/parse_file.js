const { [@modelName]Model } = require("../../models")

const [@modelName]RestHandlers = {
    get:(req, res)=>{
        [@modelName]Model.select('')
        .then((users)=>{
            res.send(users);
        })
        .catch((err)=>{
            throw err;
        })
    },
    getOne:(req, res)=>{
        [@modelName]Model.select(`id = ${req.params.id}`)
        .then((users)=>{
            res.send(users);
        })
        .catch((err)=>{
            throw err;
        })
    },
    post: (req, res) =>{
        [@modelName]Model.insert([@modelProps])
        .then((object)=>{
            res.send(object);
        })
        .catch((err)=>{
            throw err;
        });
    },
    put: (req, res) =>{
        [@modelName]Model.update(req.body, `id = ${req.params.id}`)
        .then((object)=>{
            res.send(object)
        })
        .catch((err)=>{
            throw err;
        })
    },
    delete: (req, res) =>{
        [@modelName]Model.delete(`id = ${req.params.id}`)
        .then((object)=>{
            res.send({})
        })
        .catch((err)=>{
            throw err;
        })
    },
}

module.exports.[@modelName]RestHandlers = [@modelName]RestHandlers;