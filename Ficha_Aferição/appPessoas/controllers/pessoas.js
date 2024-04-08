var mongoose = require('mongoose')
const { modelName } = require("../models/pessoa")
var Pessoa = require("../models/pessoa")

module.exports.list = () => {
    return Pessoa
        .find()
        .exec()
}

module.exports.findById = id => {
    console.log(id)
    return Pessoa
        .findOne({BI : id})
        .exec()
}


module.exports.insert = pessoa => {
    if((Pessoa.find({_id : pessoa._id}).exec()).length != 1){
        var newPerson = new Pessoa(pessoa)
        return newPerson.save()
    }
}

module.exports.update = (id, pessoa) => {
    return Pessoa
        .findByIdAndUpdate(id, pessoa, {new : true})
        .exec()
    }

module.exports.remove = id => {
    return Pessoa
        .findByIdAndDelete(id)
        .exec()
}

module.exports.getAllModalidades = () => {
    return Pessoa
        .distinct('desportos')
        .sort()
        .exec()
}

module.exports.getAllAtletasByModalidade = mod => {
    return Pessoa
        .find({desportos : mod})
        .sort({nome : 1})
        .exec()
}