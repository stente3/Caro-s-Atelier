import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.jwtSecret,
      {
        expiresIn: "1d"
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
} 