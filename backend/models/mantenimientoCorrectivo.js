const mongoose = require('mongoose');

const computadoraSchema = new mongoose.Schema({
    tipo_computadoras: String,
    marca_computadoras: String,
    modelo_computadoras: String,
    serial_computadoras: String,
    problema: String
});

const mantenimientoCorrectivoSchema = new mongoose.Schema({
    fecha: Date,
    hora: String,
    direccion: String,
    computadoras: [computadoraSchema], // Lista de computadoras
    sintomas: String,
    accion_previa: String,
    frecuencia: String,
    prioridad: {
        type: String,
        enum: ['baja', 'media', 'alta'],
        default: 'baja'
    },
    tecnico_asignado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cliente_asignado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    estado: {
        type: String,
        enum: ['pendiente', 'en proceso', 'completado', 'cancelado'],
        default: 'pendiente'
    }
}, {
    timestamps: true
});

const MantenimientoCorrectivo = mongoose.model('MantenimientoCorrectivo', mantenimientoCorrectivoSchema);

module.exports = MantenimientoCorrectivo;
