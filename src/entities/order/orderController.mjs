import AppError from '../../utils/appError.mjs';
import catchAsync from '../../utils/catchAsync.mjs';
import Order from './orderModel.mjs';

export const getOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    status: 'success',
    results: orders.length,
    orders,
  });
});

export const addUserToBody = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};

export const createOrder = catchAsync(async (req, res, next) => {
  const order = await Order.create(req.body);

  res.status(201).json({
    status: 'success',
    order,
  });
});

export const getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new AppError('No order found with that id.', 404));

  res.status(200).json({
    status: 'success',
    order,
  });
});
