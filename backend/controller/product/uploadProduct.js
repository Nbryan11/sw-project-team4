const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")
const License = require("../../models/licenseModel"); // Importa el modelo de Licencia

async function UploadProductController(req, res) {
    try {
        const sessionUserId = req.userId;

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied");
        }
        //traemos los datos del producto y el String con los keysId
        const { licenseIdsInput, ...productData } = req.body;
        let licenseIds = [];

        if (typeof licenseIdsInput === 'string') {
            const licenseKeys = licenseIdsInput.split(',').map(id => id.trim());

            // Crear nuevas licencias en la base de datos y obtener sus IDs
            const licenseDocuments = await License.insertMany(
                licenseKeys.map(key => ({ licenseKey: key }))
            );
            licenseIds = licenseDocuments.map(doc => doc._id);
        }

        const uploadProduct = new productModel({
            ...productData,
            licenseIds: licenseIds
        });
        const saveProduct = await uploadProduct.save();

        // Actualizar las licencias con el ID del producto, ya que no podemos asignar un producto a las licencias 
        //si todavia no existe el producto 
        await License.updateMany(
            { _id: { $in: licenseIds } },
            { $set: { productId: saveProduct._id } }
        );

        res.status(201).json({
            message: "Product uploaded successfully",
            error: false,
            success: true,
            data: saveProduct
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = UploadProductController;