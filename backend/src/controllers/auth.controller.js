import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userFound = await userModel.findOne({ email });
    if (userFound) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await userModel.save({
      name,
      email,
      password: passwordHash
    });

    const token = await createAccessToken({ id: newUser._id });

    res.cookie('token', token);

    res.json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await userModel.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = await createAccessToken({ id: userFound._id });

    res.cookie('token', token);

    res.json({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
}; 