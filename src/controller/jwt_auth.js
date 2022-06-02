import generateAccessToken from '../utils/generateAccesToken.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import asyncHandler from '../middleware/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

export const registerUser = asyncHandler(async (req, res, next) => {
  const {
    body: { email, password, ...rest },
  } = req;

  // Check if User exist
  const user = await User.findOne({ email });
  console.log(email, password);
  if (user) throw new ErrorResponse('Email already exists', 403);

  // Hash Password
  const hash = await bcrypt.hash(password, 5);
  const { _id } = await User.create({ ...rest, email, password: hash });

  // GenerateAccesToken
  const token = jwt.sign({ _id }, process.env.TOKEN_SECRET);
  res.json({ token });
});

export const loginUser = asyncHandler(async (req, res) => {
  const {
    body: { username, password },
  } = req;

  const user = await User.findOne({ username }).select('+password');
  if (!user) {
    res.status(404).render('pages/login', { route: 'jwt' });
    throw new ErrorResponse("User doesn't exist", 404);
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new ErrorResponse('Password is incorrect', 404);
  const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);
  res.header('Authorization', token).render('pages/checkJWTpage');
});

export const getUser = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findById(userId);
  if (!user) throw new ErrorResponse(`User doesn't exist`, 404);
  res.json(user);
});

export const verifyToken = (req, res) => {
  const { JWT_TOKEN } = req.body;

  try {
    const verified = jwt.verify(JWT_TOKEN, process.env.TOKEN_SECRET);
    if (verified) {
      req.user = verified;
      res.header('Authorization', JWT_TOKEN).redirect('/jwt/admin');
    }
  } catch (e) {
    console.log(e);
    res.redirect('login');
  }
};
