// auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { ENV } from '../config/env.config';
import { generateToken, verifyAccessToken, verifyRefreshToken } from '../modules/auth/auth.utils';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    try {
        if (!accessToken) {
            if (refreshToken) {
                await refreshTokens(req, res);
                return next();
            }
            return res.status(401).json({ message: 'Unauthorized - No tokens' });
        }

        try {
            const decoded = verifyAccessToken(accessToken);
            (req as any).user = decoded;
            return next();
        } catch (err: any) {
            if (err.name === 'TokenExpiredError' && refreshToken) {
                await refreshTokens(req, res);
                return next();
            }
            return res.status(401).json({ message: 'Unauthorized access' });
        }
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

const refreshTokens = async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;
    const decoded = verifyRefreshToken(refreshToken) as { userId: number };

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateToken({ userId: decoded.userId });

    // In dev: secure: false so cookies aren't blocked over HTTP
    const cookieOptions = {
        httpOnly: true,
        secure: ENV.NODE_ENV !== "development",
        sameSite: ENV.NODE_ENV === "development" ? 'lax' : 'strict',
        path: '/'
    };

    res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: ENV.NODE_ENV !== "development",
        sameSite: ENV.NODE_ENV === "development" ? 'lax' : 'strict',
        path: '/',
        maxAge: 60 * 60 * 1000
    });
    res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: ENV.NODE_ENV !== "development",
        sameSite: ENV.NODE_ENV === "development" ? 'lax' : 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    (req as any).user = decoded;
};
