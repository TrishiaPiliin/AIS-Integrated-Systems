import * as AuthService from '../services/authService.js';

export const registerStudent = async (req, res) => {
  const { firstName, lastName, dob, course, major, status } = req.body;

  if (!firstName || !lastName || !dob || !course || !major || !status) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  try {
    const studentProfile = { firstName, lastName, dob, course, major, status };

    const result = await AuthService.registerStudent(studentProfile);

    res.status(201).json({
      success: true,
      message: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message   
    });
  }
};