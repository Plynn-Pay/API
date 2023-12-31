const router = require('express').Router()
const Estoque = require('../models/Estoque')

//Gravar dados da Estoque
router.post('/', async (req, res) =>{
   
    const {nome, doca_id, status} = req.body

    // Validação dos dados
    if(!nome){
        res.status(422).json({error: 'O nome do estoque é obrigatório'}) 
        return
    }

    if(!doca_id){
        res.status(422).json({error: 'O ID da Doca é obrigatório'}) 
        return
    }

    const estoque = {
        nome,
        doca_id,
        status
    }

    try {
        // criando dados
        await Estoque.create(estoque)
        res.status(201).json({message: 'Estoque inserido no sistema com sucesso"'})
        
    } catch (error) {
        res.status(500).json({error: error})
    }

})

//Listar todas os Estoque
router.get('/', async (req, res) =>{
    try {   
        const estoque = await Estoque.find()
        res.status(200).json(estoque)

    } catch (error) {
        res.status(500).json({error: error}) 
    }
})

//Buscar Coporação por ID
router.get('/:id', async (req, res) =>{
    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        const estoque = await Estoque.findOne({_id: id})

        if(!estoque) {
            res.status(424).json({message: 'Estoque não foi encontrado'})
            return
        }

        res.status(200).json(estoque)
    } catch (error) {
        res.status(500).json({error: error}) 
    }
})

// Upadate - Atuazliação de daos (PUT | PATCH)
router.patch('/:id', async (req, res) =>{
    
    const id = req.params.id

    const {nome, doca_id, status} = req.body

    const estoque = {
        nome,
        doca_id,
        status
    }

   try {
    const updateEstoque = await Estoque.updateOne({_id: id}, estoque)

    if(updateEstoque.matchedCount === 0) {
        res.status(424).json({message: 'Estoque não foi encontrado'})
        return
    } 

    res.status(200).json(estoque)
    
   } catch (error) {
    res.status(500).json({error: error}) 
   }

})

module.exports = router