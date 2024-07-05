const computerModel = require("../../models/computerModel");

const uploadComputer = async (req, res) => {
    try {
        const { tipoComputadora, marca, modelo, productImage } = req.body;
        const sessionUserId = req.userId;

        const newComputer = new computerModel({
            tipoComputadora,
            marca,
            modelo,
            productImage,
            usuario: sessionUserId,
        });

        const saveComputer = await newComputer.save();

    
        res.status(201).json({
            message: "Computer uploaded successfully",
            error: false,
            success: true,
            data: saveComputer
        });

    } catch (error) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = uploadComputer