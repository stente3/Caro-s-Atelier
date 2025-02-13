import { updateJSONBin, getJSONBin } from '../services/jsonBinService.js';

// Obtiene los datos almacenados en JSONBin
export const getData = async (req, res) => {
    try {
        const data = await getJSONBin();
        res.json(data);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).send('Error al obtener los datos');
    }
};

// Actualiza los datos en JSONBin con la información recibida en el body
export const updateData = async (req, res) => {
    try {
        const updatedData = await updateJSONBin(req.body);
        res.json({
            message: 'Información actualizada con éxito',
            data: updatedData,
        });
    } catch (error) {
        console.error('Error al actualizar los datos:', error);
        res.status(500).send('Error al actualizar los datos');
    }
}; 