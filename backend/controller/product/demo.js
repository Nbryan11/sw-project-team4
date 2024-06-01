const demoController = async(req, res)=>{
    try{
        res.json({
            data: "hola desde demoController"
        })
    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
   }



module.exports = demoController