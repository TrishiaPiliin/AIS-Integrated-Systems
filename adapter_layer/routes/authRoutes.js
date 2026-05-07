import * as AuthController from '../controllers/authController.js';
import express from "express";

const authRoutes = express.Router();

// POST /auth/register — Register a new student in the legacy system
authRoutes.post('/register', AuthController.registerStudent);

// GET /auth/students — Get all students from the legacy system
authRoutes.get('/students', AuthController.getAllStudents);

// GET /auth/students/:id — Get a specific student from the legacy system
authRoutes.get('/students/:id', AuthController.getStudentById);

export default authRoutes;