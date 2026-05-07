import * as StudentModel from '../models/studentModel.js';

export const createProfile = async (req, res) => {
    try {
        const result = await StudentModel.createStudent(req.body);
        res.status(201).json({
            success: true,
            message: [{ result: "A profile has been added!" }],
            data: result
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

export const getProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const profile = await StudentModel.getStudentProfile(id);
        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

export const listAllProfiles = async (req, res) => {
    try {
        const profiles = await StudentModel.getAllProfiles();
        res.status(200).json({
            success: true,
            data: profiles
        });
    } catch (error) {
        console.error('listAllProfiles error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};