import { Request, Response, NextFunction } from 'express';
import { ENV } from '../config/env.config';
import { generateToken, verifyAccessToken, verifyRefreshToken } from '../modules/auth/auth.utils';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    console.log("Access Token:", accessToken || "Not found");
    console.log("Refresh Token:", refreshToken || "Not found");

    // If no access token but refresh token exists → try refresh
    if (!accessToken) {
        if (refreshToken) {
            await tryRefreshToken(req, res, next);
            return
        }
        res.status(401).json({ message: 'Unauthorized - No tokens' });
        return
    }

    try {
        const decoded = verifyAccessToken(accessToken);
        (req as any).user = decoded;
        next();
        return
    } catch (err: any) {
        if (err.name === 'TokenExpiredError' && refreshToken) {
            await tryRefreshToken(req, res, next);
            return
        }
        res.status(401).json({ message: 'Unauthorized access' });
        return
    }
};

const tryRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        res.status(401).json({ message: 'Unauthorized - No refresh token' });
        return
    }

    try {
        const decoded = verifyRefreshToken(refreshToken) as { userId: number };

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateToken(decoded);

        // Set new cookies
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: ENV.NODE_ENV !== "development",
            sameSite: ENV.NODE_ENV === "development" ? 'none' : 'strict',
            maxAge: 60 * 60 * 1000,
        });

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: ENV.NODE_ENV !== "development",
            sameSite: ENV.NODE_ENV === "development" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        (req as any).user = decoded;
        next();
        return
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized - Invalid refresh token' });
        return
    }
};
