const Mantenimiento = require("../../models/mantenimientoPreventivo");
const userModel = require("../../models/userModel");

const createMantenimiento = async (req, res) => {
    const { descripcion, fecha, hora, direccion, tipo_computadoras, marca_computadoras, cantidad_computadoras, otros_detalles } = req.body;
    const cliente_asignado = req.userId;
    const DURACION_POR_COMPUTADORA_MINUTOS = 25;

    const calcularDuracionMantenimiento = (cantidadComputadoras) => {
        return DURACION_POR_COMPUTADORA_MINUTOS * cantidadComputadoras;
    };
    const duracionMantenimiento = calcularDuracionMantenimiento(cantidad_computadoras);

    const fechaHoraInicio = new Date(`${fecha}T${hora}:00`);
    const fechaHoraFin = new Date(fechaHoraInicio.getTime() + duracionMantenimiento * 60000);

    try {
        // Encuentra un técnico disponible
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

        // Crear el mantenimiento preventivo
        const mantenimiento = new Mantenimiento({
            descripcion,
            fecha,
            hora,
            direccion,
            tipo_computadoras,
            marca_computadoras,
            cantidad_computadoras,
            otros_detalles,
            tecnico_asignado: tecnico._id,
            cliente_asignado
        });

        await mantenimiento.save();

        // Actualizar la disponibilidad del técnico
        if (!tecnico.disponibilidad) {
            tecnico.disponibilidad = [];
        }
        tecnico.disponibilidad.push({ inicio: fechaHoraInicio, fin: fechaHoraFin });
        await tecnico.save();

        res.status(201).json({ message: 'Mantenimiento preventivo creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = createMantenimiento
