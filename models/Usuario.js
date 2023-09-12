const mongoose = require('mongoose')

const Usuario = mongoose.model('Usuario',{
    unidade_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Unidade'},
    nome: String,
    celular: String,
    email: String,
    senha: String,
    tipo: String, 
    status: Boolean,
})

module.exports = Usuario