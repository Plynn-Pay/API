const mongoose = require('mongoose')

const Usuario = mongoose.model('Usuario',{
    unidade: String,
    nome: String,
    celular: String,
    email: String,
    senha: String,
    tipo: String,
    status: Boolean,
})

module.exports = Usuario