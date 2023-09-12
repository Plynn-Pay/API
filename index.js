// configuração inicial - imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
//const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()


//forma de ler JSON / middlewares

app.use(
    express.urlencoded({
        extended: true,
    }),
)

// Config JSON response
app.use(express.json())

// rotas da API
const corporacaoRoutes = require('./routes/corporacaoRoutes')
app.use('/corporacao', corporacaoRoutes)

const unidadeRoutes = require('./routes/unidadeRoutes')
app.use('/unidade', unidadeRoutes)

const docaRoutes = require('./routes/docaRoutes')
app.use('/doca', docaRoutes)

const estoqueRoutes = require('./routes/estoqueRoutes')
app.use('/estoque', estoqueRoutes)

const productGroupRoutes = require('./routes/productGroupRoutes')
app.use('/product_group', productGroupRoutes)


const usuarioRoutes = require('./routes/usuarioRoutes')
const Usuario = require('./models/Usuario')
app.use('/usuario', usuarioRoutes)



// rota inicial / Public Route
app.get('/', (req, res) => {
    //mostrar req - requisição
    res.status(200).json({message: 'Oi Express!'})
})

// Private Route
app.get('/user/:id', checkToken, async (req, res) =>{

    const id = req.params.id

    // Checar se usuário existe
    const usuario = await Usuario.findById(id, '-senha').populate('unidade_id').populate('unidade_id');
    
    if(!usuario) {
        res.status(404).json({message: 'Usuário não foi encontrado'})
        return
    }

    res.status(200).json({usuario})
})


function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        res.status(401).json({message: 'Acesso Negado'})
        return
    }

    try {
    
        const secret = process.env.SECRET
        
        jwt.verify(token, secret)

        next()

    } catch (error) {
        res.status(400).json({message: 'Token inválido'})
        return
    }

}


//entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.td2zhwm.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(()=> {
        console.log("Conectamos ao MongoDB!")
        app.listen(process.env.PORT || 3000)

    })
    .catch((err) => console.log(err))
