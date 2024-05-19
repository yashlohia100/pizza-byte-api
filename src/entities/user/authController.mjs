import config from '../../../config.mjs';
import AppError from '../../utils/appError.mjs';
import catchAsync from '../../utils/catchAsync.mjs';
import { jwtSignAsync, jwtVerifyAsync } from './jwtMethods.mjs';
import User from './userModel.mjs';

const getJwtToken = async (userId) => {
  const token = await jwtSignAsync({ id: userId }, config.JWT_SECRET, {
    expiresIn: '3d',
  });
  return token;
};

const sendJwtCookie = (res, token) => {
  const cookieOptions = {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.sameSite = 'none';
    cookieOptions.secure = true;
  }

  res.cookie('jwt', token, cookieOptions);
};

const createSendToken = async (user, res, statusCode) => {
  const token = await getJwtToken(user.id);

  sendJwtCookie(res, token);

  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  await createSendToken(user, res, 201);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password.', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError('No user found with that email.', 404));
  }

  const isCorrect = await user.checkPassword(password);
  if (!isCorrect) {
    return next(new AppError('Incorrect password.', 401));
  }

  await createSendToken(user, res, 200);
});

export const protect = catchAsync(async (req, res, next) => {
  // Extract the token
  let token = null;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('You are not logged in.', 401));
  }

  // Verify the token
  const decoded = await jwtVerifyAsync(token, config.JWT_SECRET);

  // Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    );
  }

  // Grant access to protected route
  console.log('Authenticated:', { id: currentUser.id, name: currentUser.name });
  req.user = currentUser;
  next();
});

export const logout = (req, res) => {
  // Send a past cookie with same name
  const cookieOptions = {
    maxAge: -60 * 1000,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.sameSite = 'none';
    cookieOptions.secure = true;
  }

  res.cookie('jwt', 'loggedout', cookieOptions);

  res.status(200).json({
    status: 'success',
  });
};
