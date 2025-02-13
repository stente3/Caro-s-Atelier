import axios from 'axios';
import { config } from '../config/env.js';

// Actualiza los datos en JSONBin mediante una petición PUT
export const updateJSONBin = async (data) => {
    try {
        const response = await axios.put(config.jsonBinUrl, data, {
            headers: {
                'X-Master-Key': config.masterKey,
                'Content-Type': 'application/json',
            },
        });
        console.log('JSONBin actualizado:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar JSONBin:', error);
        throw error;
    }
};

// Obtiene los datos almacenados en JSONBin mediante una petición GET
export const getJSONBin = async () => {
    try {
        const response = await axios.get(config.jsonBinUrl, {
            headers: {
                'X-Master-Key': config.masterKey,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}; 