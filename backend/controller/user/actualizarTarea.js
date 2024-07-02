const Mantenimiento = require("../../models/mantenimientoPreventivo");

const actualizarTarea = async (req, res) => {
    try {
        const tareaId = req.params.id;
        const { fecha, hora, estado } = req.body;

        // Verificar si los campos proporcionados son válidos
        const updateFields = {};
        if (fecha) updateFields.fecha = fecha;
        if (hora) updateFields.hora = hora;
        if (estado) updateFields.estado = estado;

        const tareaActualizada = await Mantenimiento.findByIdAndUpdate(
            tareaId,
            { $set: updateFields },
            { new: true, runValidators: true } // Opciones para devolver la tarea actualizada y ejecutar validaciones
        );

        
        if (!tareaActualizada) {
            return res.status(404).json({
                success: false,
                message: 'Tarea no encontrada',
            });
        }

        res.json({
            success: true,
            message: 'Tarea actualizada correctamente',
            data: tareaActualizada,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Error al actualizar la tarea',
        });
    }
};

module.exports = {
    actualizarTarea,
};