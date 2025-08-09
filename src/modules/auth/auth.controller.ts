import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';
import { generateToken } from './auth.utils';
import { ENV } from '../../config/env.config';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, role, email, password } = req.body
        const user = await authService.signup({ name, role, email, password });
        const { accessToken, refreshToken } = generateToken({ userId: user.id })
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: ENV.NODE_ENV !== "development",
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: ENV.NODE_ENV !== "development",
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ success: true, data: user });
    } catch (err: any) {
        next(err)
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        console.log(req.body)
        const user = await authService.login({ email, password });
        const { accessToken, refreshToken } = generateToken({ userId: user.id })
        console.log({ accessToken, refreshToken })
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: ENV.NODE_ENV !== "development",
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: ENV.NODE_ENV !== "development",
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ success: true, data: user });
    } catch (err: any) {
        next(err)
    }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.userId
        const user = await authService.getMe(userId)
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

export const logout = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: ENV.NODE_ENV !== "development",
            sameSite: 'lax',
            path: '/'
        });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: ENV.NODE_ENV !== "development",
            sameSite: 'lax',
            path: '/'
        });
    } catch (error) {
        next(error)
    }
}
