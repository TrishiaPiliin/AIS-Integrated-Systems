import * as UserController from '../controllers/UserController.js';
import authHandler from '../middleware/authHandler.js';
import express from 'express';

const userRoutes = express.Router();

userRoutes.post('/register', UserController.register);
userRoutes.post('/login', UserController.login);
userRoutes.get('/me', authHandler, UserController.getMe);
userRoutes.get('/all', authHandler, UserController.getAllUsers);

export default userRoutes;