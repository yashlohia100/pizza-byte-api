import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import AppError from './utils/appError.mjs';
import globalErrorHandler from './error/errorController.mjs';
import authRouter from './entities/user/authRoutes.mjs';
import pizzaRouter from './entities/pizza/pizzaRoutes.mjs';
import userRouter from './entities/user/userRoutes.mjs';
import cookieParser from 'cookie-parser';
import orderRouter from './entities/order/orderRoutes.mjs';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.get('/', (req, res) => {
  res.status(200).json({ status: 'success' });
});

// Mounting the router
app.use('/api/pizzas', pizzaRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/auth', authRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
