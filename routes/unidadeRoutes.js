const router = require('express').Router()
const Unidade = require('../models/Unidade')

//Gravar dados da Unidade
router.post('/', async (req, res) =>{
   
    // {nome: "Bullguer", razao: "Bulluger Alimentos SA", cnpj: 21.288.040/0001-94}
    const {nome, razao, cnpj, ie, endereco, cep, cidade, uf, contato, email, logotipo, celular, ramoAtividade, dhCadastro, dhAlteracao, status} = req.body

    // Validação dos dados
    if(!nome){
        res.status(422).json({error: 'O nome da uniadde é obrigatório'}) 
        return
    }

    const unidade = {
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
        await Unidade.create(unidade)
        res.status(201).json({message: 'Unidade inserida no sistema com sucesso"'})
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//Listar todas as Unidades
router.get('/', async (req, res) =>{
    try {   
        const unidade = await Unidade.find()
        res.status(200).json(unidade)

    } catch (error) {
        res.status(500).json({error: error}) 
    }
})

//Buscar Coporação por ID
router.get('/:id', async (req, res) =>{
    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        const unidade = await Unidade.findOne({_id: id})

        if(!unidade) {
            res.status(424).json({message: 'Unidade não foi encontrada'})
            return
        }

        res.status(200).json(unidade)
    } catch (error) {
        res.status(500).json({error: error}) 
    }
})

// Upadate - Atuazliação de daos (PUT | PATCH)
router.patch('/:id', async (req, res) =>{
    
    const id = req.params.id

    const {nome, razao, cnpj, ie, endereco, cep, cidade, uf, contato, email, logotipo, celular, ramoAtividade, dhCadastro, dhAlteracao, status} = req.body

    const unidade = {
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
    const updateUnidade = await Unidade.updateOne({_id: id}, unidade)

    if(updateUnidade.matchedCount === 0) {
        res.status(424).json({message: 'Unidade não foi encontrada'})
        return
    } 

    res.status(200).json(unidade)
    
   } catch (error) {
    res.status(500).json({error: error}) 
   }

})

module.exports = router