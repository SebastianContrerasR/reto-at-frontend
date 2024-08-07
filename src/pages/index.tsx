import FlightList from "@/components/FlightList";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen mx-auto">
      <h1 className="text-4xl font-bold mb-4">Flight Booking System</h1>
      <Link href="/my-tickets">
        <span className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block">
          My Tickets
        </span>
      </Link>
      <FlightList />
    </div>
  );
};

export default Home;
