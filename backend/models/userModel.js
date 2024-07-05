const mongoose = require('mongoose')

const disponibilidadSchema = new mongoose.Schema({
    inicio: Date,
    fin: Date
}, { _id: false });

const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : String,
    profilePic : String,
    role : String,
    profilePic: String,
    phone: String,
    documentType: String,
    document: String,
    disponibilidad: [disponibilidadSchema] // Array de fechas y horas ocupadas
},{
    timestamps : true
})

const userModel =  mongoose.model("user",userSchema)

module.exports = userModel