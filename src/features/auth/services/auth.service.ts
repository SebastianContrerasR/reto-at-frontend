import { API_URL } from "@/features/common/constants/constants";
import { LoginRequest, LoginResponse, RegisterRequest } from "../types/auth.types";

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Error en la autenticación');
    }

    return response.json();
};

export const register = async (credentials: RegisterRequest): Promise<void> => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData?.message || 'Failed to register');
    }
};
