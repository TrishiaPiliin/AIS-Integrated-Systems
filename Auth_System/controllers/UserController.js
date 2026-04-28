import * as UserModel from '../models/UserModel.js';

export const register = async (req, res) => {
  const { email, password, firstName, lastName, dob, course, major, status } = req.body;

  if (!email || !password || !firstName || !lastName || !dob || !course || !major || !status) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  try {
    const userProfile = { firstName, lastName, dob, course, major, status };
    const user = await UserModel.createUser(userProfile, email, password);
    res.status(201).json({ success: true, message: [{ result:  'registration successful'}] });
  } catch (e) {
    console.error(e);
    res.status(400).json({ success: false, message: e.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  try {
    const token = await UserModel.login(email, password);
    res.status(200).json({
      success: true,
      message: [{ result: 'Login successful' }, { token }]
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({ success: false, message: e.message });
  }
};