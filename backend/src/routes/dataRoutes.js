import { Router } from 'express';
import { getData, updateData } from '../controllers/dataController.js';

const router = Router();

router.get('/', getData);
router.put('/update', updateData);

export default router; 