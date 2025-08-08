import { db } from "../../config/db.config";



export const getProfile = async (userId: number) => {
    const users = await db.query.users.findMany()
    return users;
};
