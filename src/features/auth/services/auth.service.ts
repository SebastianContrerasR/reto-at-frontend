import { API_URL } from "@/features/common/constants/constants";
import { LoginRequest, LoginResponse } from "../types/auth.types";

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
