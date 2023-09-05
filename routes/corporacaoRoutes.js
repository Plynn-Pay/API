const router = require('express').Router()
const Corporacao = require('../models/Corporacao')

//Gravar dados da Corporação
router.post('/', async (req, res) =>{
   
    // {nome: "Bullguer", razao: "Bulluger Alimentos SA", cnpj: 21.288.040/0001-94}
    const {nome, razao, cnpj, ie, endereco, cep, cidade, uf, contato, email, logotipo, celular, ramoAtividade, dhCadastro, dhAlteracao, status} = req.body

    // Validação dos dados
    if(!nome){
        res.status(422).json({error: 'O nome da corporação é obrigatório'}) 
        return
    }

    const corporacao = {
        nome,
        razao,
        cnpj,
        ie,
        endereco,
        cep,
        cidade,
        uf,
        contato,
        email,
        logotipo,
        celular,
        ramoAtividade,
        dhCadastro,
        dhAlteracao,
        status
    }

    try {
        // criando dados
        await Corporacao.create(corporacao)
        res.status(201).json({message: 'Corporação inserida no sistema com sucesso"'})
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//Listar todas as Corporações
router.get('/', async (req, res) =>{
    try {   
        const corporacao = await Corporacao.find()
        res.status(200).json(corporacao)

    } catch (error) {
        res.status(500).json({error: error}) 
    }
})

//Buscar Coporação por ID
router.get('/:id', async (req, res) =>{
    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        const corporacao = await Corporacao.findOne({_id: id})

        if(!corporacao) {
            res.status(424).json({message: 'Corporação não foi encontrada'})
            return
        }

        res.status(200).json(corporacao)
    } catch (error) {
        res.status(500).json({error: error}) 
    }
})

// Upadate - Atuazliação de daos (PUT | PATCH)
router.patch('/:id', async (req, res) =>{
    
    const id = req.params.id

    const {nome, razao, cnpj, ie, endereco, cep, cidade, uf, contato, email, logotipo, celular, ramoAtividade, dhCadastro, dhAlteracao, status} = req.body

    const corporacao = {
        nome,
        razao,
        cnpj,
        ie,
        endereco,
        cep,
        cidade,
        uf,
        contato,
        email,
        logotipo,
        celular,
        ramoAtividade,
        dhCadastro,
        dhAlteracao,
        status
    }

   try {
    const updateCorporacao = await Corporacao.updateOne({_id: id}, corporacao)

    if(updateCorporacao.matchedCount === 0) {
        res.status(424).json({message: 'Corporação não foi encontrada'})
        return
    } 

    res.status(200).json(corporacao)
    
   } catch (error) {
    res.status(500).json({error: error}) 
   }

})

module.exports = router