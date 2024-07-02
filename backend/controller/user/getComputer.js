const computerModel = require("../../models/computerModel")

const getComputer = async(req, res) =>{
    try{
        const currentUser = req.userId

        const allComputer = await computerModel.find({usuario: currentUser}).populate('usuario');

        res.json({
            message: "PC's obtenidas correctamente",
            data: allComputer,
            success: true,
            error: false
        });
    }catch(error){
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = getComputer