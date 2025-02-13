import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Obtener la ruta del archivo actual en formato compatible con ESM
const __filename = fileURLToPath(import.meta.url);
// Obtener el directorio del archivo actual
const __dirname = path.dirname(__filename);

// Exportar objeto de configuración con variables de entorno y rutas
export const config = {
    imgurClientId: process.env.IMGUR_CLIENT_ID, // Clave de API para subir imágenes a Imgur
    masterKey: process.env.JSONBIN_MASTER_KEY,  // Clave maestra para acceder a JSONBin
    jsonBinUrl: process.env.JSONBIN_URL,    // URL del contenedor en JSONBin
    port: process.env.PORT || 3000, // Puerto del servidor, usa 3000 si no está definido
    uploadPath: path.join(__dirname, '../../upload/images') // Ruta absoluta para guardar imágenes temporales
}; 