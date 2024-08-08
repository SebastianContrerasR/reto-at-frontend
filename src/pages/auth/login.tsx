import LoginForm from '@/features/auth/components/loginForm';
import { useAuth } from '@/features/auth/context/AuthContext';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const LoginPage: NextPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    if (user) {
        router.push('/');
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
