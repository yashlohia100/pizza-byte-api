import { Router } from 'express';
import {
  addUserToBody,
  createOrder,
  getOrder,
  getOrders,
} from './orderController.mjs';
import { protect } from '../user/authController.mjs';

const orderRouter = Router();

orderRouter.route('/').get(getOrders).post(protect, addUserToBody, createOrder);

orderRouter.route('/:id').get(getOrder);

export default orderRouter;
