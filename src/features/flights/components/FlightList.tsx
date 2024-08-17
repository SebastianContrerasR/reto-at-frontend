import Loading from '@/features/common/components/Loading';
import { getFlights } from '@/features/flights/services/flight.service';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Flight {
    id: string;
    departure: string;
    arrival: string;
    departureDate: string;
    arrivalDate: string;
}

const FlightList: React.FC = () => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        try {
            const data = await getFlights();
            setFlights(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="space-y-6 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Available Flights</h1>
            {flights.length === 0 ? (
                <p className="text-center text-gray-500">No flights found.</p>
            ) : (
                flights.map((flight: Flight) => (
                    <div key={flight.id} className="border border-gray-200 p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-2 flex items-center justify-between">
                            <span>{flight.departure} to {flight.arrival}</span>
                            <span className="text-gray-500 text-sm">{new Date(flight.departureDate).toLocaleDateString()}</span>
                        </h2>
                        <div className="text-gray-700">
                            <p className="mb-1">
                                <strong>Departure Date:</strong> {new Date(flight.departureDate).toLocaleString()}
                            </p>
                            <p className="mb-1">
                                <strong>Arrival Date:</strong> {new Date(flight.arrivalDate).toLocaleString()}
                            </p>
                        </div>
                        <Link href={`/flights/${flight.id}`}>
                            <span className="mt-4 inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-purple-600 hover:to-blue-500 transition-colors duration-300">
                                Reserve
                            </span>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );

};

export default FlightList;
