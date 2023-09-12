const mongoose = require('mongoose')

const Product_group = mongoose.model('Product_group',{
    unidade_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Unidade'},
    name: String,
    status: Boolean,
}) 

module.exports = Product_group