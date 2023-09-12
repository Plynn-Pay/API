const router = require('express').Router()
const Usuario = require('../models/Usuario')
const Unidade = require('../models/Unidade')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

// Create - Criação de Dados
router.post('/', async (req, res) =>{
    // req.body
   
    // {nome: "Fernando", email: "fernando@ferdz.com.br", status: true}
    const {unidade_id, nome, celular, email, senha, tipo, status} = req.body

    if(!unidade_id){
        res.status(422).json({error: 'A unidade é obrigatória'}) 
        return
    }

    if(!nome){
        res.status(422).json({error: 'O nome é obrigatório'}) 
        return
    }

    if(!tipo){
        res.status(422).json({error: 'O tipo / perfil é obrigatório'}) 
        return
    }

    if(!senha){
        res.status(422).json({error: 'A senha é obrigatória'}) 
        return
    }

    //Checar se usuário já existe
    const userExists = await Usuario.findOne({email: email})

    if (userExists){
        res.status(422).json({error: 'Por favor, e-mail já caastrado em nossa base'}) 
        return
    }


     //Checar se Unidade já existe
     //const unidadeExists = await Unidade.findOne({_id: unidade_id})

     // const unidade = await Unidade.findOne({_id: id}).populate('corporacao_id');

     //if (!unidadeExists){
       //  res.status(422).json({error: 'Por favor, envie uma unidade válida'}) 
        // return
     //}

    // Criar senha
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(senha, salt)

    const usuario = {
        unidade_id, 
        nome, 
        celular, 
        email, 
        senha: passwordHash, 
        tipo, 
        status
    }

    try {
        // criando dados
        await Usuario.create(usuario)
        res.status(201).json({message: 'Usuário inserido no sistema com sucesso"'})
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Login Usuario
router.post('/auth', async(req, res) => {

    const {email, senha} = req.body

    if(!email){
        res.status(422).json({error: 'O e-mail é obrigatório'}) 
        return
    }

    if(!senha){
        res.status(422).json({error: 'A senha é obrigatória'}) 
        return
    }

    // Verificar se usuário existe
    const user = await Usuario.findOne({email: email})

    if (!user){
        res.status(404).json({error: 'Usuário não encontraddo'}) 
        return
    }

    // Checar se senha está correta
    const checkPassword = await bcrypt.compare(senha, user.senha)

    if(!checkPassword) {
        res.status(422).json({error: 'Usuário ou senha inválida'}) 
        return
    }

    try {  

        const secret = process.env.SECRET
        const token = jwt.sign(
            {
            id: user._id
            },
            secret,
        )

        res.status(200).json({msg: 'Autenticação realizada com sucesso', token})

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'        
        })
    }

})


//Read - Leitura de dados
router.get('/', async (req, res) =>{
    try {   
        const usuarios = await Usuario.find({}, '-status') 
        res.status(200).json(usuarios)

    } catch (error) {
        res.status(500).json({error: error}) 
    }
})

//Read - Por id
router.get('/:id', async (req, res) =>{
    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        const usuario = await Usuario.findOne({_id: id, }, '-senha')

        if(!usuario) {
            res.status(404).json({message: 'Usuário não foi encontrado'})
            return
        }

        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({error: error}) 
    }
})

// Upadate - Atuazliação de daos (PUT | PATCH)
router.patch('/:id', async (req, res) =>{
    
    const id = req.params.id

    const {unidade_id, nome, celular, email, senha, tipo, status} = req.body

    const usuario = {
        unidade_id, 
        nome, 
        celular, 
        email, 
        senha, 
        tipo, 
        status
    }

   try {
    const updateUsuario = await Usuario.updateOne({_id: id}, usuario)

    if(updateUsuario.matchedCount === 0) {
        res.status(424).json({message: 'Usuário não foi encontrado'})
        return
    } 

    res.status(200).json(usuario)
    
   } catch (error) {
    res.status(500).json({error: error}) 
   }

})

//Delete - Deletar dados
router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const usuario = await Usuario.findOne({_id: id})

    if(!usuario) {
        res.status(424).json({message: 'Usuário não foi encontrado'})
        return
    }

    try {
       await Usuario.deleteOne({_id: id})
       res.status(200).json({message: 'Usuário deletado com sucesso'})
    } catch (error) {
        res.status(500).json({error: error}) 
    }


})

module.exports = router