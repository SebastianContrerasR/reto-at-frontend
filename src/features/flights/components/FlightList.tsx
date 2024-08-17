import Loading from '@/features/common/components/Loading';
import { calculateTimeDifference } from '@/features/common/utils';
import { getFlights } from '@/features/flights/services/flight.service';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaPlane } from 'react-icons/fa';

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
        <div className="space-y-4 p-4">
            <Head>
                <title>Flight List</title>
            </Head>
            <h1 className="text-2xl font-bold mb-4">Flight List</h1>
            {flights.length === 0 ? (
                <p>No flights found.</p>
            ) : (
                flights.map((flight: Flight) => (
                    <div key={flight.id} className="border p-6 rounded-md shadow-md bg-white space-y-4">

                        <div className="flex justify-between items-center space-x-4">


                            <div className="text-center">
                                <p className="text-lg font-bold">{new Date(flight.departureDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                <p className="text-sm text-gray-500">{flight.departure.slice(0, 3).toUpperCase()}</p>
                            </div>

                            <div className="flex-1 flex justify-center items-center space-x-4">
                                <div className="flex-1 hidden md:block border-t-2 border-dotted border-gray-300" />
                                <div className="flex flex-col justify-center items-center space-y-2 text-center">
                                    <FaPlane size={24} className="text-blue-500" />
                                    <p className="text-sm text-gray-500 mt-1">
                                        {calculateTimeDifference(flight.departureDate, flight.arrivalDate)}
                                    </p>
                                </div>
                                <div className="flex-1 hidden md:block border-t-2 border-dotted border-gray-300" />
                            </div>

                            <div className="text-center">
                                <p className="text-lg font-bold">{new Date(flight.arrivalDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                <p className="text-sm text-gray-500">{flight.arrival.slice(0, 3).toUpperCase()}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm space-x-2">
                            <p className="text-gray-500">Operated by Flight Booking Saga SAC</p>
                            <Link href={`/flights/${flight.id}`}>
                                <span className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Reserve
                                </span>
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    );



};

export default FlightList;
