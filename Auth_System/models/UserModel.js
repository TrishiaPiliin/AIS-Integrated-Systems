import pool from '../config/db.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ADAPTER_URL = process.env.ADAPTER_URL || 'http://localhost:4000';

export const createUser = async (userProfile, email, password) => {
    if (!email || !password) {
        const error = new Error('Email and Password are required.');
        error.statusCode = 400;
        throw error;
    }

    if (!validator.isEmail(email)) {
        const error = new Error('Invalid email address.');
        error.statusCode = 400;
        throw error;
    }

    if (password.length < 6) {
        const error = new Error('Password must be at least 6 characters.');
        error.statusCode = 400;
        throw error;
    }

    const [existingUser] = await pool.query(
        'SELECT email FROM user WHERE email = ?', [email]
    );

    if (existingUser.length > 0) {
        const error = new Error(`The email ${email} is already in use.`);
        error.statusCode = 400;
        throw error;
    }

    const response = await fetch(`${ADAPTER_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userProfile)
    });

    const result = await response.json();

    if (!response.ok) {
        const error = new Error(result.error || 'Failed to register student in legacy system');
        error.statusCode = response.status;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await pool.query(
        'INSERT INTO user (email, password) VALUES (?, ?)',
        [email, hashedPassword]
    );

    return { insertId: newUser.insertId, legacyStudent: result };
};

export const login = async (email, password) => {
    if (!email || !password) {
        const error = new Error('Email and password are required.');
        error.statusCode = 400;
        throw error;
    }

    const [user] = await pool.query(
        'SELECT * FROM user WHERE email = ?', [email]
    );

    if (user.length === 0) {
        const error = new Error(`An account with the email ${email} does not exist.`);
        error.statusCode = 400;
        throw error;
    }

    const validPassword = await bcrypt.compare(password, user[0].password);

    if (!validPassword) {
        const error = new Error('Incorrect password.');
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        { id: user[0].id },
        process.env.SECRET,
        { expiresIn: '1d' }
    );

    return token;
};

export const getUser = async (id) => {
    if (isNaN(parseInt(id))) {
        throw new Error('Invalid id');
    }
    const [user] = await pool.query('SELECT id, email FROM user WHERE id = ?', [id]);
    return user;
};

export const getAllUsers = async () => {
    const [users] = await pool.query('SELECT id, email FROM user');
    return users;
};