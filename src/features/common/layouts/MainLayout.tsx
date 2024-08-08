import { ReactNode } from 'react';
import Navbar from '../components/NavBar';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main className="p-4">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
