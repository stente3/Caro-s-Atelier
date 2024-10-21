import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Obtener __filename y __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Usar variables de entorno
const imgurClientId = process.env.IMGUR_CLIENT_ID;
const masterKey = process.env.JSONBIN_MASTER_KEY;
const jsonBinUrl = process.env.JSONBIN_URL;

// Configuración de multer (storage engine)
const storage = multer.diskStorage({
	destination: path.join(__dirname, '/upload/images'), // Ruta relativa
	filename: (req, file, cb) => {
		cb(
			null,
			`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

const upload = multer({ storage: storage });

// Inicialización de Express
const app = express();
app.use(cors());
app.use(morgan('dev')); // Usar morgan para registrar peticiones
app.use(express.json()); // Para parsear JSON en el body de las peticiones

// Función para actualizar JSONBin
const updateJSONBin = async (data) => {
	try {
		const response = await axios.put(jsonBinUrl, data, {
			headers: {
				'X-Master-Key': masterKey,
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

// Subir imagen y luego enviarla a Imgur
app.post('/upload', upload.single('imagen'), async (req, res) => {
	try {
		// Ruta relativa de la imagen guardada localmente
		const imagePath = path.resolve(
			__dirname,
			`./upload/images/${req.file.filename}`
		);

		// Crear formData y leer la imagen desde la ruta relativa correcta
		const formData = new FormData();
		formData.append('image', fs.createReadStream(imagePath));

		// Subir la imagen a Imgur
		const response = await axios.post(
			'https://api.imgur.com/3/image',
			formData,
			{
				headers: {
					Authorization: `Client-ID ${imgurClientId}`,
					...formData.getHeaders(),
				},
			}
		);

		// Eliminar la imagen local después de subirla a Imgur
		fs.unlink(imagePath, err => {
			if (err) {
				console.error('Error al eliminar la imagen local:', err);
			}
		});

		// Preparar la respuesta
		const result = {
			success: 1,
			imgur_url: response.data.data.link, // URL de la imagen subida a Imgur
		};

		// Mostrar el resultado en consola
		console.log('Resultado enviado al front-end:', result);

		// Responder con la URL de la imagen en Imgur
		res.json(result);
	} catch (error) {
		console.error(
			'Error subiendo la imagen a Imgur:',
			error.response?.data || error.message
		);
		res
			.status(500)
			.json({ success: 0, message: 'Error subiendo la imagen a Imgur' });
	}
});

// Verbo GET (Obtener datos de JSONBin)
app.get('/', async (req, res) => {
	try {
		const response = await axios.get(
			jsonBinUrl,
			{
				headers: {
					'X-Master-Key': masterKey,
				},
			}
		);
		res.json(response.data);
	} catch (error) {
		console.error('Error al obtener los datos:', error);
		res.status(500).send('Error al obtener los datos');
	}
});

// Verbo PUT (Actualizar datos en JSONBin desde el body)
app.put('/update', async (req, res) => {
	const newInfo = req.body; // Obtenemos la nueva información desde el body

	try {
		const updatedData = await updateJSONBin(newInfo);
		res.json({
			message: 'Información actualizada con éxito',
			data: updatedData,
		});
	} catch (error) {
		console.error('Error al actualizar los datos:', error);
		res.status(500).send('Error al actualizar los datos');
	}
});

// Manejar errores de multer
app.use((err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		res.status(400).json({ success: 0, message: err.message });
	} else {
		res.status(500).json({ success: 0, message: 'Error interno del servidor' });
	}
});

// Inicializar servidor
const PORT = process.env.PORT || 3000; // Usar el puerto de entorno si está disponible
app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
