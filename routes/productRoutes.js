const router = require('express').Router()
const Product = require('../models/Product')

//Gravar dados do Produto
router.post('/', async (req, res) =>{
   
    const {name, product_group_id, price, imageUrl, ncm, description, status} = req.body

    // Validação dos dados
    if(!name){
        res.status(422).json({error: 'O nome do produto é obrigatório'}) 
        return
    }

    if(!product_group_id){
        res.status(422).json({error: 'A categoria do produto obrigatório'}) 
        return
    }

    if(!price){
        res.status(422).json({error: 'O preço do produto obrigatório'}) 
        return
    }

    const product = {
        name,
        product_group_id,
        price,
        imageUrl,
        ncm,
        description,
        status
    }

    try {
        // criando dados
        await Product.create(product)
        res.status(201).json({message: 'Produto inserido no sistema com sucesso"'})
        
    } catch (error) {
        res.status(500).json({error: error})
    }

})

//Listar todas os Produtos
router.get('/', async (req, res) =>{
    try {   
        const product = await Product.find()
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({error: error}) 
    }
})

//Buscar Produto por ID
router.get('/:id', async (req, res) =>{
    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        const product = await Product.findOne({_id: id})

        if(!product) {
            res.status(424).json({message: 'Produto não foi encontrado'})
            return
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({error: error}) 
    }
})

// Upadate - Atuazliação de daos (PUT | PATCH)
router.patch('/:id', async (req, res) =>{
    
    const id = req.params.id

    const {name, product_group_id, price, imageUrl, ncm, description, status} = req.body

    const product = {
        name,
        product_group_id,
        price,
        imageUrl,
        ncm,
        description,
        status
    }

   try {
    const updateProduct = await Product.updateOne({_id: id}, product)

    if(updateProduct.matchedCount === 0) {
        res.status(424).json({message: 'Estoque não foi encontrado'})
        return
    } 

    res.status(200).json(product)
    
   } catch (error) {
    res.status(500).json({error: error}) 
   }

})

module.exports = router