import TicketList from "@/components/TicketList";
import MainLayout from "@/features/common/layouts/MainLayout";

const Index: React.FC = () => {
    return (
        <MainLayout>
            <TicketList />
        </MainLayout>
    );
};

export default Index;