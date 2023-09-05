const mongoose = require('mongoose')

const Corporacao = mongoose.model('Corporacao',{
    nome: String,
    razao: String,
    cnpj: String,
    ie: String,
    endereco: String,
    cep: String,
    cidade: String,
    uf: String,
    contato: String,
    email: String,
    logotipo: String,
    celular: String,
    ramoAtividade: String,
    dhCadastro: Date,
    dhAlteracao: Date,
    status: Boolean,
}) 

module.exports = Corporacao