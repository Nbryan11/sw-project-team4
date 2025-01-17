const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function updateProductController(req, res){
    try{
        if(!uploadProductPermission(req.userId)){
            throw new Erro("Permission denied")
        }

        const {_id, ...resBody} = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

        res.json({
            message : "product update successfuly",
            data: updateProduct,
            success: true,
            error: false
        })

    }catch(err){
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = updateProductController