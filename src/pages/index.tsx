import MainLayout from "@/features/common/layouts/MainLayout";
import FlightList from "@/features/flights/components/FlightList";
import Head from "next/head";

const Home = () => {
  return (
    <MainLayout>
      <Head>
        <title>Flight List</title>
      </Head>
      <FlightList />
    </MainLayout>
  );
};

export default Home;
