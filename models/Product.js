const mongoose = require('mongoose')

const Product = mongoose.model('Product',{
    name: String,
    product_group_id: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductGroup'},
    price: String,
    imageUrl: String,
    ncm: String,
    description: String,
    status: Boolean,
}) 

module.exports = Product