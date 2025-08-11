export interface SignupInput {
    name: string;
    email: string;
    password: string;
    role: 'Student' | 'Teacher' | "Admin";
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface TokenPayload {
    userId: string;
    role: string;
}
