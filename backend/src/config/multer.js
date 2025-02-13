import multer from 'multer';
import path from 'path';
import { config } from './env.js';

// Configuración del almacenamiento para multer
const storage = multer.diskStorage({
    destination: config.uploadPath, // Ruta donde se guardarán los archivos
    filename: (req, file, cb) => {
        // Genera un nombre único usando el campo del formulario, timestamp y extensión original
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

// Middleware de multer con la configuración de almacenamiento
export const upload = multer({ storage: storage }); 