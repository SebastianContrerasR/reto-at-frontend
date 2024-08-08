import RegisterForm from '@/features/auth/components/registerForm';
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
                <RegisterForm />
            </div>
        </div>
    );
};

export default LoginPage;
