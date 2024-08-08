import { useAuth } from '@/features/auth/context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
    const { user, token, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => setMenuOpen(!menuOpen);

    return (
        <nav className="bg-blue-600 text-white flex items-center justify-between p-4 shadow-md">
            <div className="flex items-center">
                <Link href="/">
                    <span className="text-xl font-semibold">Flight Booking App</span>
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                {token ? (
                    <div className="relative">
                        <button onClick={handleMenuToggle} className="flex items-center space-x-2 focus:outline-none">
                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white">
                                {user?.name?.[0]}
                            </div>
                            <span>{user?.name}</span>
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48">
                                <Link href="/my-tickets">
                                    <span className="block px-4 py-2 hover:bg-gray-100">My Tickets</span>
                                </Link>
                                <button
                                    onClick={() => { logout() }}
                                    className="block px-4 py-2 w-full text-left hover:bg-gray-100 focus:outline-none"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>

                        <Link href="/auth/login">
                            <span className=" hover:underline">Login</span>
                        </Link>
                        <span className="mx-2">or</span>
                        <Link href="/auth/register">
                            <span className=" hover:underline">Register</span>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
