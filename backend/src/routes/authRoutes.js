import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import { authRequired } from '../middleware/authRequired.js';
import userModel from '../models/user.model.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authRequired, logout);

router.get('/profile', authRequired, async (req, res) => {
  try {
    const userFound = await userModel.findOne({ _id: req.user.id });
    if (!userFound) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 