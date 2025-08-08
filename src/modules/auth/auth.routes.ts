import { Router } from 'express';
import { getMe, login, logout, signup } from './auth.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/register', signup);
authRouter.post('/login', login);
authRouter.get('/me', authMiddleware, getMe)
authRouter.post('/logout', logout)

export default authRouter;
