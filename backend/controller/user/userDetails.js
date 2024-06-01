const userModel = require("../../models/userModel")

async function userDetailsController(req,res){
    try{
        console.log("userId",req.userId)
        const user = await userModel.findById(req.userId)

        console.log(user)

        res.status(200).json({
            data: user,
            error : false,
            success : true,
            message : "detalle de usuario"
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

module.exports = userDetailsController