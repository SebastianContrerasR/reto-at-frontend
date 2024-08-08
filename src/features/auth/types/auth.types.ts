export interface AuthUser {
    name: string;
}

export interface LoginResponse {

    user: AuthUser;
    accessToken: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}
