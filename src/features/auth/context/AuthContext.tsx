import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { login } from '../services/auth.service';
import { AuthUser, LoginRequest, LoginResponse } from '../types/auth.types';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

interface AuthContextType {
    user: AuthUser | null;
    token: string | null;
    error: string | null;
    authenticate: (credentials: LoginRequest) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    const authenticate = async (credentials: LoginRequest) => {
        try {
            const data: LoginResponse = await login(credentials);
            setUser(data.user);
            setToken(data.accessToken);
            setError(null);

            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.accessToken);

            router.push('/');
            toast.success('Logged in successfully');
        } catch (error) {
            setError('Error en la autenticación');
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        toast.success('Logged out successfully');
    };


    return (
        <AuthContext.Provider value={{ user, token, error, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
