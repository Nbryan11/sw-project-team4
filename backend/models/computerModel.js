const mongoose = require('mongoose')

const computerSchema =  mongoose.Schema({
    tipoComputadora: String,
    marca: String,
    modelo: String,
    productImage: [],
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
})

const computerModel =  mongoose.model("computer",computerSchema)

module.exports = computerModel