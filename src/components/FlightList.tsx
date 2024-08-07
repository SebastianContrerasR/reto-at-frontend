import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFlights } from '@/services/flightService';
import Loading from './Loading';
import Link from 'next/link';

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
    const router = useRouter();

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
        <div className="space-y-4 p-4">
            <h1 className="text-2xl font-bold mb-4">Flight List</h1>
            {flights.length === 0 ? (
                <p>No flights found.</p>
            ) : (

                flights.map((flight) => (
                    <div key={flight.id} className="border p-4 rounded-md shadow-md">
                        <h2 className="text-xl font-semibold">{flight.departure} to {flight.arrival}</h2>
                        <p><strong>Departure Date:</strong> {new Date(flight.departureDate).toLocaleDateString()}</p>
                        <p><strong>Arrival Date:</strong> {new Date(flight.arrivalDate).toLocaleDateString()}</p>
                        <Link href={`/flights/${flight.id}`}>
                            <span className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block">
                                Reserve
                            </span>
                        </Link>
                    </div>
                )))}
        </div>
    );
};

export default FlightList;
