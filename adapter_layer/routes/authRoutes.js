import express from 'express';
import * as AuthController from '../controllers/authController.js';

const authRoutes = express.Router();

authRoutes.post('/register', AuthController.registerStudent);

export default authRoutes;