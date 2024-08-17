import MainLayout from '@/features/common/layouts/MainLayout';
import FlightDetails from '@/features/flights/components/FlightDetails';
import Head from 'next/head';

const FlightPage = () => {

    return (
        <MainLayout>
            <Head>
                <title>Select your seats</title>
            </Head>
            <FlightDetails />
        </MainLayout>
    );
};

export default FlightPage;
