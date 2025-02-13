import { Router } from 'express';
import { upload } from '../config/multer.js';
import { uploadImage } from '../controllers/imageController.js';

const router = Router();

router.post('/upload', upload.single('imagen'), uploadImage);

export default router; 