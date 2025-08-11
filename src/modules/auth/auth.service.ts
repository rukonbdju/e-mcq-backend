import bcrypt from 'bcrypt';
import * as repo from './auth.repository';
import { SignupInput, LoginInput } from './auth.types';
import { ApiError } from '../../utils/ApiError';

export const signup = async (input: SignupInput) => {
    console.log(input)
    const { name, email, password, role } = input
    if (password.length < 6) throw new ApiError(401, 'Minimum length of password is 6.')
    const existingUser = await repo.findUserByEmail(email);
    if (existingUser) throw new ApiError(401, 'User already exist.');
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await repo.createUser({ name, email, password: passwordHash, role });
    return user
};

export const login = async (input: LoginInput) => {
    const { email, password } = input
    const user = await repo.findUserByEmail(email);
    if (!user) throw new ApiError(404, 'User not found');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new ApiError(403, 'Invalid password');
    return user;
};

export const getMe = async (userId: string) => {
    const user = await repo.findUserById(userId)
    if (!user) throw new ApiError(404, 'User not found')
    return user;
}

