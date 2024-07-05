const productModel = require("../../models/productModel")

const getCategoryProduct = async(req,res)=> {
    try{
        const productCategory = await productModel.distinct("category")
        console.log("category", productCategory)

        //array to store one product from each category
        const productByCategory = []

        for(const category of productCategory){
            const product = await productModel.findOne({category})

            if(product){
                productByCategory.push(product)
            }
        }

        res.status(200).json({
            message: "categorias traidas",
            error: false,
            success: true,
            data: productByCategory
        })
        
    }catch(err){
        if (err.name === 'ValidationError') {
            res.status(400).json({
              message: 'Error de validación',
              error: true,
              success: false,
            });
          } else {
            res.status(500).json({
              message: 'Error en la base de datos',
              error: true,
              success: false,
            });
          }
    }
}

module.exports = getCategoryProduct