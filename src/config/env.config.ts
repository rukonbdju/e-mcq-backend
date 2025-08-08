import dotenv from 'dotenv';
dotenv.config();
export const ENV = {
    PORT: process.env.PORT! || 4000,
    DATABASE_URL: process.env.DATABASE_URL! || '',
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET! || 'Bangladesh',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET! || 'Bangladesh',
    NODE_ENV: process.env.NODE_ENV! || 'development'
};