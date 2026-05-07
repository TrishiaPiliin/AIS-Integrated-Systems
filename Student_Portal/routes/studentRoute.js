import * as StudentController from '../controllers/studentController.js';
import express from 'express';

const studentRoutes = express.Router();

studentRoutes.get('/', StudentController.listAllProfiles);
studentRoutes.get('/:id', StudentController.getProfile);
studentRoutes.post('/', StudentController.createProfile);

export default studentRoutes;