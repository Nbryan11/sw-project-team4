const userModel = require("../../models/userModel")

async function updateUserProfile (req, res){
    try{

        const sessionUser = req.userId

        const { email, name, phone, document} = req.body   
        
        const payload = {
            ...(email &&  {email : email}),
            ...(name &&  {name : name}),
            ...(phone &&  {phone   : phone}),
            ...(document &&  {document   : document}),

        }


        const updateUser = await userModel.findByIdAndUpdate(sessionUser,payload)

   
        
        res.json({
            data : updateUser,
            message : "User Updated",
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false,
            error : true
        })
    }
}

module.exports = updateUserProfile