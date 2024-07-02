const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
    licenseIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'License' }] // Array de ObjectId que referencia a License

},{
    timestamps : true
})

const productModel =  mongoose.model("product",productSchema)

module.exports = productModel
