const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    productName: {type: String},
    quantity: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    licenseKey:  { type: String } // Agrega el campo licenseKey

});

const orderSchema = new mongoose.Schema({
    userId: {type: String},
    products: [productSchema],
    totalQty: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;