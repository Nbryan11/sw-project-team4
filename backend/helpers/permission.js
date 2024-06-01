const userModel = require("../models/userModel")

//validamos que el usuario que quiere subir un nuevo producto tenga el rol de admin
const uploadProductPermission = async(userId) => {
    const user = await userModel.findById(userId)

    if(user.role !== 'ADMIN'){
        return false
    }

    return true
}


module.exports = uploadProductPermission