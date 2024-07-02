const mantenimientoCorrectivo = require("../../models/mantenimientoCorrectivo");

const getMantenimientoCorrectivo = async (req, res) => {
    try {
        const tecnicoId = req.userId; // Asegúrate de que req.userId contenga el ID del técnico
        const { estado } = req.query; // Obtiene el parámetro de estado desde la URL

        let query = { tecnico_asignado: tecnicoId };

        if (estado) {
            query.estado = estado; // Filtra por estado si se proporciona
        }

        const tareas = await mantenimientoCorrectivo.find(query).populate('tecnico_asignado')
    

        res.json({
            message: "Tareas obtenidas correctamente",
            data: tareas,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = getMantenimientoCorrectivo;

