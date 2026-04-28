import pool from '../config/db.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async (userProfile, email, password) => {
  if (!email || email.trim() === '') {
    throw new Error('Email is required');
  }
  if (!validator.isEmail(email)) {
    throw new Error('Invalid email format');
  }

  const [existing] = await pool.query(
    'SELECT * FROM usertbl WHERE email = ?',
    [email]
  );
  if (existing.length > 0) {
    throw new Error('Account already exists');
  }

  if (!password || password.trim() === '') {
    throw new Error('Password is required');
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error('Password is too weak')
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const response = await fetch('http://localhost:5854/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userProfile)
  });

  if (!response.ok) {               
    const errBody = await response.json().catch(() => ({}));
    throw new Error(errBody.message || 'Adapter layer error: ' + response.status);
  }

  const [newUser] = await pool.query(
    'INSERT INTO usertbl (email, password) VALUES (?, ?)',
    [email, hashedPassword]
  );

  return newUser.insertId;
};

export const getUser = async (id) => {
  if (isNaN(parseInt(id))) {
    throw new Error('Invalid ID');
  }

  const [user] = await pool.query(
    'SELECT * FROM usertbl WHERE id = ?',
    [id]
  );
  return user[0] || null;
};

export const login = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const [user] = await pool.query(
    'SELECT * FROM usertbl WHERE email = ?',
    [email]
  );

  if (user.length === 0) {
    throw new Error(`No account found for ${email}`);
  }

  if (!bcrypt.compareSync(password, user[0].password)) {
    throw new Error('Incorrect password');
  }

  const token = jwt.sign(
    { id: user[0].id },
    process.env.SECRET,
    { expiresIn: '1d' }
  );

  return token;
};
