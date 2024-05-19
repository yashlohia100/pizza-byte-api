import AppError from '../../utils/appError.mjs';
import catchAsync from '../../utils/catchAsync.mjs';
import Pizza from './pizzaModel.mjs';

export const getPizzas = catchAsync(async (req, res, next) => {
  const pizzas = await Pizza.find().sort('_id');

  res.status(200).json({
    status: 'success',
    results: pizzas.length,
    pizzas,
  });
});

export const createPizza = catchAsync(async (req, res, next) => {
  const pizza = await Pizza.create(req.body);

  res.status(201).json({
    status: 'success',
    pizza,
  });
});

export const getPizza = catchAsync(async (req, res, next) => {
  const pizza = await Pizza.findById(req.params.id);

  if (!pizza) return next(new AppError('No pizza found with that id.', 404));

  res.status(200).json({
    status: 'success',
    pizza,
  });
});

export const updatePizza = catchAsync(async (req, res, next) => {
  const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!pizza) return next(new AppError('No pizza found with that id.', 404));

  res.status(200).json({
    status: 'success',
    pizza,
  });
});

export const deletePizza = catchAsync(async (req, res, next) => {
  const pizza = await Pizza.findByIdAndDelete(req.params.id);

  if (!pizza) return next(new AppError('No pizza found with that id.', 404));

  res.status(200).json({
    status: 'success',
    pizza,
  });
});
