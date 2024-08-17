import RegisterForm from '@/features/auth/components/registerForm';
import { useAuth } from '@/features/auth/context/AuthContext';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const RegisterPage: NextPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    if (user) {
        router.push('/');
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Head>
                <title>Register</title>
            </Head>
            <div className="w-full max-w-md">
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterPage;
