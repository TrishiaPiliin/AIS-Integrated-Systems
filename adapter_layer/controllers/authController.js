import * as AuthService from '../services/authService.js';

export const registerStudent = async (req, res) => {
    try {
        const studentProfile = req.body;
        const result = await AuthService.registerStudent(studentProfile);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await AuthService.getStudentById(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const result = await AuthService.getAllStudents();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
};