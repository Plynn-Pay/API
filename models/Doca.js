const mongoose = require('mongoose')

const Doca = mongoose.model('Doca',{
    nome: String,
    unidade_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Doca'},
    status: Boolean,
}) 

module.exports = Doca