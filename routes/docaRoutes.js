const router = require('express').Router()
const Doca = require('../models/Doca')

//Gravar dados da Doca
router.post('/', async (req, res) =>{
   
    const {nome, unidade_id, status} = req.body

    // Validação dos dados
    if(!nome){
        res.status(422).json({error: 'O nome da Doca é obrigatório'}) 
        return
    }

    if(!unidade_id){
        res.status(422).json({error: 'O ID da Corporação é obrigatório'}) 
        return
    }

    const doca = {
        nome,
        unidade_id,
        status
    }

    try {
        // criando dados
        await Doca.create(doca)
        res.status(201).json({message: 'Doca inserida no sistema com sucesso"'})
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//Listar todas as Docas
router.get('/', async (req, res) =>{
    try {   
        const doca = await Doca.find()
        res.status(200).json(doca)

    } catch (error) {
        res.status(500).json({error: error}) 
    }
})

//Buscar Doca por ID
router.get('/:id', async (req, res) =>{
    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        const doca = await Doca.findOne({_id: id})

        if(!doca) {
            res.status(424).json({message: 'Doca não foi encontrada'})
            return
        }

        res.status(200).json(doca)
    } catch (error) {
        res.status(500).json({error: error}) 
    }
})

// Upadate - Atuazliação de daos (PUT | PATCH)
router.patch('/:id', async (req, res) =>{
    
    const id = req.params.id

    const {nome, unidade_id, status} = req.body

    const doca = {
        nome,
        unidade_id,
        status
    }

   try {
    const updateDoca = await Doca.updateOne({_id: id}, doca)

    if(updateDoca.matchedCount === 0) {
        res.status(424).json({message: 'Doca não foi encontrada'})
        return
    } 

    res.status(200).json(doca)
    
   } catch (error) {
    res.status(500).json({error: error}) 
   }

})

module.exports = router