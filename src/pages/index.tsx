import MainLayout from "@/features/common/layouts/MainLayout";
import FlightList from "@/features/flights/components/FlightList";

const Home = () => {
  return (
    <MainLayout>
      <FlightList />
    </MainLayout>
  );
};

export default Home;
