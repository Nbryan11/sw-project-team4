const Mantenimiento = require("../../models/mantenimientoPreventivo")

const getSupport = async(req, res) =>{
    try{
    const currentUser = req.userId

    const supports = await Mantenimiento.find({cliente_asignado: currentUser})

    res.json({
        message : "all products",
        success:  true,
        error: false,
        data: supports
    })



}catch(error){
    res.json({
        message: err.message || err,
        error: true,
        success: false,
    })
}

}
module.exports = getSupport