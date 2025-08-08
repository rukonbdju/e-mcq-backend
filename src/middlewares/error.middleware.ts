import { Request, Response, NextFunction } from 'express';
import { ENV } from '../config/env.config';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    console.error(err)

    return res.status(statusCode).json({
        message,
        statusCode
    });
};
