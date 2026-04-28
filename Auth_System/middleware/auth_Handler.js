import jwt from 'jsonwebtoken';
import * as UserModel from '../models/UserModel.js';

const authHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      success: false,
      message: 'You do not have permission to access the app.'
    });
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    const user = await UserModel.getUser(id);

    if (!user || user.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    req.user = user[0];   
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: 'Request is unauthorized'   
    });
  }
};

export default authHandler;