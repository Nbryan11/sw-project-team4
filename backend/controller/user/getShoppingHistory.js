const Order = require("../../models/shoppingHistoryModel")

async function getShoppingHistory(req,res){
    try{
        const currentUser = req.userId
        console.log("iduSERR",currentUser)
        const historyShopping = await Order.find({ userId: currentUser }).populate('products.productId')

        res.json({
            message: "okk",
            data: historyShopping,
            success: true,
            error: false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false,
            message : "error"
        })
    }
}

module.exports = getShoppingHistory