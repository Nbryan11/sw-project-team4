const Order = require("../../models/shoppingHistoryModel");
const License = require("../../models/licenseModel");


async function shoppingHistory(req, res) {
    const { userId, products, totalQty, totalPrice } = req.body;
    
    try {
        
        const productsWithLicenses = [];
        
        for (let product of products) {
            const license = await License.findOneAndDelete({productId: product.productId}); // Encuentra y elimina una licencia disponible
            if (license) {
                productsWithLicenses.push({
                    ...product,
                    licenseKey: license.licenseKey // Asigna la clave de la licencia
                });
            } else {
                throw new Error(`No available licenses for product ${product.productId}`);
            }
        }
        const newOrder = new Order({
            userId,
            products: productsWithLicenses,
            totalQty,
            totalPrice
        });

        await newOrder.save();

        res.status(200).json({ success: true, message: 'Order saved successfully.' });
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = shoppingHistory;