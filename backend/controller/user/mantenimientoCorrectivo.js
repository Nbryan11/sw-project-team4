const MantenimientoCorrectivo = require("../../models/mantenimientoCorrectivo");
const userModel = require("../../models/userModel");

const createMantenimientoCorrectivo = async (req, res) => {
    const {
        descripcion,
        fecha,
        hora,
        direccion,
        computadoras,
        sintomas,
        accion_previa,
        frecuencia,
        prioridad
    } = req.body;

    const cliente_asignado = req.userId;

    try {
        const fechaHoraInicio = new Date(`${fecha}T${hora}:00`);
        const fechaHoraFin = new Date(fechaHoraInicio.getTime() + 60 * 60000); // Cada revisión dura una hora

        const tecnico = await userModel.findOne({
            role: 'TECHNICAL',
            $or: [
                { disponibilidad: { $exists: false } },
                {
                    disponibilidad: {
                        $not: {
                            $elemMatch: {
                                $or: [
                                    { inicio: { $lt: fechaHoraFin, $gte: fechaHoraInicio } },
                                    { fin: { $gt: fechaHoraInicio, $lte: fechaHoraFin } },
                                    { inicio: { $lte: fechaHoraInicio }, fin: { $gte: fechaHoraFin } }
                                ]
                            }
                        }
                    }
                }
            ]
        });

        if (!tecnico) {
            return res.status(400).json({ message: 'No hay técnicos disponibles para el horario solicitado' });
        }

        const mantenimiento = new MantenimientoCorrectivo({
            descripcion,
            fecha,
            hora,
            direccion,
            computadoras,
            sintomas,
            accion_previa,
            frecuencia,
            prioridad,
            tecnico_asignado: tecnico._id,
            cliente_asignado
        });

        await mantenimiento.save();

        if (!tecnico.disponibilidad) {
            tecnico.disponibilidad = [];
        }
        tecnico.disponibilidad.push({ inicio: fechaHoraInicio, fin: fechaHoraFin });
        await tecnico.save();

        res.status(201).json({ message: 'Mantenimiento correctivo creado exitosamente', success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createMantenimientoCorrectivo
};