import catchAsync from '../../utils/catchAsync.mjs';
import User from './userModel.mjs';

export const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  });
});

// Protected route
export const getMe = (req, res) => {
  res.status(200).json({
    status: 'success',
    user: req.user,
  });
};
