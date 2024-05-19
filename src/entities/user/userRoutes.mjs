import { Router } from 'express';
import { getMe, getUsers } from './userController.mjs';
import { protect } from './authController.mjs';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/me', protect, getMe);

export default userRouter;
