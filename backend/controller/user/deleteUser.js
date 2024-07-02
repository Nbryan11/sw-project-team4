const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');

const deleteUser = async(req, res) =>{
    try {
        const sessionUser = req.userId;
        const { password } = req.body;

        console.log("Session User ID:", sessionUser);
        console.log("Password from body:", password);

        const user = await userModel.findById(sessionUser);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verifica la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const result = await userModel.deleteOne({ _id: sessionUser });

        res.json({
            message: "Usuario eliminado exitosamente",
            success: true
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = deleteUser