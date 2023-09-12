const mongoose = require('mongoose')

const Product = mongoose.model('Product',{
    name: String,
    product_group_id: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductGroup'},
    price: Decimal128,
    imageUrl: String,
    ncm: String,
    status: Boolean,
}) 

module.exports = Product