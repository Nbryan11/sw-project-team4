const mongoose = require('mongoose');

const mantenimientoSchema = new mongoose.Schema({
    descripcion: String,
    fecha: Date,
    hora: String,
    direccion: String,
    tipo_computadoras: String,
    marca_computadoras: String,
    cantidad_computadoras: Number,
    otros_detalles: String,
    tecnico_asignado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    cliente_asignado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    estado: {
        type: String,
        enum: ['pendiente', 'en proceso', 'completado', 'cancelado'],
        default: 'pendiente'
    }
}, {
    timestamps: true
});

const Mantenimiento = mongoose.model('MantenimientoPreventivo', mantenimientoSchema);

module.exports = Mantenimiento;