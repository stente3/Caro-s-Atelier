import fs from 'fs';
import path from 'path';
import { uploadToImgur } from '../services/imgurService.js';

// Controlador para subir imágenes a Imgur
export const uploadImage = async (req, res) => {
    try {
        // Obtiene la ruta absoluta del archivo subido
        const imagePath = path.resolve(req.file.path);
        // Sube la imagen a Imgur y obtiene la URL
        const imgurUrl = await uploadToImgur(imagePath);

        // Elimina el archivo temporal del servidor
        fs.unlink(imagePath, err => {
            if (err) console.error('Error al eliminar la imagen local:', err);
        });

        // Prepara la respuesta exitosa
        const result = {
            success: 1,
            imgur_url: imgurUrl,
        };

        console.log('Resultado enviado al front-end:', result);
        res.json(result);
    } catch (error) {
        // Maneja errores durante la subida
        console.error('Error subiendo la imagen a Imgur:', error.response?.data || error.message);
        res.status(500).json({ success: 0, message: 'Error subiendo la imagen a Imgur' });
    }
}; 