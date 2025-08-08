import { Router } from 'express';
import { getProfile } from './user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const userRouter = Router();

userRouter.get('/profile', authMiddleware, getProfile);

export default userRouter;
