import * as UserModel from '../models/UserModel.js';

export const register = async (req, res) => {
    const { email, password, firstName, lastName, dob, course, major, status, address } = req.body;

    try {
        const userProfile = { firstName, lastName, dob, course, major, status, address };
        await UserModel.createUser(userProfile, email, password);

        res.status(201).json({
            success: true,
            message: [{ result: 'A new account has been created!' }]
        });
    } catch (e) {
        console.error(e);
        res.status(e.statusCode || 500).json({
            success: false,
            message: e.message || 'Internal Server Error'
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await UserModel.login(email, password);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: [{ result: 'Login successful!', token }]
        });
    } catch (e) {
        console.error(e);
        res.status(e.statusCode || 500).json({
            success: false,
            message: e.message || 'Internal Server Error'
        });
    }
};

export const getMe = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.getAllUsers();
        res.status(200).json({ success: true, users });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
};