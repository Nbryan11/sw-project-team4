const { default: mongoose } = require("mongoose");

const licenseSchema = new mongoose.Schema({
    licenseKey: String,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product'} // ID del producto asociado

    // Otros campos relacionados con la licencia...
});

const License = mongoose.model('License', licenseSchema);

module.exports = License;