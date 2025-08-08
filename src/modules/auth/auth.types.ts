export interface SignupInput {
    name: string;
    email: string;
    password: string;
    role: 'Student' | 'Examiner';
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface TokenPayload {
    userId: number;
}
