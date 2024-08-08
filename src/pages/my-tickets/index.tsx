import MainLayout from "@/features/common/layouts/MainLayout";
import TicketList from "@/features/tickets/components/TicketList";

const Index: React.FC = () => {
    return (
        <MainLayout>
            <TicketList />
        </MainLayout>
    );
};

export default Index;