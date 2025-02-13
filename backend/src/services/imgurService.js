import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import { config } from '../config/env.js';

// Sube una imagen a Imgur y retorna su URL pública
export const uploadToImgur = async (imagePath) => {
    // Crear el FormData y agregar la imagen desde el archivo
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));

    // Hacer la petición POST a la API de Imgur
    const response = await axios.post('https://api.imgur.com/3/image', formData, {
        headers: {
            Authorization: `Client-ID ${config.imgurClientId}`,
            ...formData.getHeaders(),
        },
    });

    // Retornar el enlace de la imagen subida
    return response.data.data.link;
}; 