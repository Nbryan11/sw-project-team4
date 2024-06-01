const demoControllerPost = async(req, res)=>{
    try{

        const  mensaje = " y añadido en controller"
        const { success, data }  = req.body;
        res.json({
            dataController: data
        })
    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
   }



module.exports = demoControllerPost