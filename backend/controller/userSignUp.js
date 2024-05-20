
const bcrypt = require('bcryptjs');
const userModel = require("../models/userModel");
const { Error } = require('mongoose');


async function userSignUpController(req, res){
    try{
        const { email, password, name } =  req.body
        const user = await userModel.findOne({email})

        if(user){
            throw new Error("usuario ya existente")
        }

        console.log(req.body)
        if(!email){
            throw new Error("por favor ingrese un correo")
        }

        if(!password){
            throw new Error("por favor ingrese una contraseña")
        }

        if(!name){
            throw new Error("por favor ingrese un nombre")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something is wrong")
        }

        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "User created Successfully!"
        })


    }catch(err){
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userSignUpController