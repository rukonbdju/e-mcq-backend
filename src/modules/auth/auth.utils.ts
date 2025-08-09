import jwt from 'jsonwebtoken';
import { TokenPayload } from './auth.types';
import { ENV } from '../../config/env.config';

export const generateToken = (payload: TokenPayload): { accessToken: string, refreshToken: string } => {
    console.log(payload)
    const accessToken = jwt.sign(payload, ENV.JWT_ACCESS_SECRET, {
        expiresIn: '1h',
    });

    const refreshToken = jwt.sign(payload, ENV.JWT_REFRESH_SECRET, {
        expiresIn: '7d',
    });
    return { accessToken, refreshToken }
}

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, ENV.JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, ENV.JWT_REFRESH_SECRET);
};
