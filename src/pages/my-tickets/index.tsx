import MainLayout from "@/features/common/layouts/MainLayout";
import TicketList from "@/features/tickets/components/TicketList";
import Head from "next/head";

const Index: React.FC = () => {
    return (
        <MainLayout>
            <Head>
                <title>My Tickets</title>
            </Head>
            <TicketList />
        </MainLayout>
    );
};

export default Index;