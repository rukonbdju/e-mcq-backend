import { Request, Response } from 'express';
import * as userService from './user.service';

export const getProfile = async (req: Request, res: Response) => {
    const userId = (req as any).userId; // set by auth middleware
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const profile = await userService.getProfile(userId);
    if (!profile) return res.status(404).json({ message: 'User not found' });

    res.json(profile);
};
