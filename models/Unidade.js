const mongoose = require('mongoose')

const Unidade = mongoose.model('Unidade',{
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

module.exports = Unidade