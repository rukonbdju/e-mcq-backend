import { eq } from 'drizzle-orm';
import { db } from '../../config/db.config';
import { users } from '../../schema';

// 1. Find user by email
export const findUserByEmail = async (email: string) => {
    const res = await db.query.users.findFirst({
        where: eq(users.email, email),
    });
    console.log("findUserByEmail", res);
    return res;
};

// 2. Find user by ID
export const findUserById = async (userId: string) => {
    const res = await db.query.users.findFirst({
        where: eq(users.id, userId),
    });
    return res;
};

// 3. Create new user
export const createUser = async (userInfo: {
    name: string;
    email: string;
    password: string;
    role: string;
}) => {
    const res = await db.insert(users)
        .values(userInfo)
        .returning();
    return res[0]; // returning is always an array
};

