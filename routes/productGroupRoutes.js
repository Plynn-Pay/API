const router = require('express').Router()
const ProductGroup = require('../models/ProductGroup')

//Gravar dados da Categoria
router.post('/', async (req, res) =>{
   
    const {name, unidade_id, status} = req.body

    // Validação dos dados
    if(!name){
        res.status(422).json({error: 'O nome da Categoria é obrigatória'}) 
        return
    }

    if(!unidade_id){
        res.status(422).json({error: 'O ID da Corporação é obrigatório'}) 
        return
    }

    const productgroup = {
        name,
        unidade_id,
        status
    }

    try {
        // criando dados
        await ProductGroup.create(productgroup)
        res.status(201).json({message: 'A Categoria inserida no sistema com sucesso"'})
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//Listar todas as Categorias
router.get('/', async (req, res) =>{
    try {   
        const productgroup = await ProductGroup.find()
        res.status(200).json(productgroup)

    } catch (error) {
        res.status(500).json({error: error}) 
    }
})

//Listar todas as Categorias por Unidade ID
router.get('/point/:unidade_id', async (req, res) =>{

    const unidade_id = req.params.unidade_id

    try {   
        const productgroup = await ProductGroup.find({unidade_id: unidade_id})
        res.status(200).json(productgroup)

    } catch (error) {
        res.status(500).json({error: error}) 
    }
})

//Buscar Categoria por ID
router.get('/:id', async (req, res) =>{
    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        const productgroup = await ProductGroup.findOne({_id: id})

        if(!productgroup) {
            res.status(424).json({message: 'Categoria não foi encontrada'})
            return
        }

        res.status(200).json(productgroup)
    } catch (error) {
        res.status(500).json({error: error}) 
    }
})

// Upadate - Atuazliação de daos (PUT | PATCH)
router.patch('/:id', async (req, res) =>{
    
    const id = req.params.id

    const {name, unidade_id, status} = req.body

    const productgroup = {
        name,
        unidade_id,
        status
    }

   try {
    const updateProductgroup = await Doca.updateOne({_id: id}, productgroup)

    if(updateProductgroup.matchedCount === 0) {
        res.status(424).json({message: 'Categoria não foi encontrada'})
        return
    } 

    res.status(200).json(productgroup)
    
   } catch (error) {
    res.status(500).json({error: error}) 
   }

})

module.exports = router