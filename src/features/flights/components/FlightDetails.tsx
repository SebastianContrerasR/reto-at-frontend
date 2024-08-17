import { useAuth } from '@/features/auth/context/AuthContext';
import Loading from '@/features/common/components/Loading';
import { FlightSeats } from '@/features/flights/components/FlightSeats';
import { SelectedSeatsBar } from '@/features/flights/components/SelectedSeatsBar';
import { getFlightDetails } from '@/features/flights/services/flight.service';
import { createTicket } from '@/features/tickets/services/ticket.service';
import { CreateTicket, CreateTicketItem } from '@/features/tickets/types/create-ticket';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';
import { toast } from 'sonner';
import { FlightDetails, Seat } from '../types/flight-details';
import { calculateTimeDifference } from '@/features/common/utils';

const FlightDetailsComponent = () => {
    const router = useRouter();
    const { token } = useAuth();
    const { id } = router.query;

    const [flight, setFlight] = useState<FlightDetails | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [isPayment, setIsPayment] = useState<boolean>(false);

    const handleSeatSelect = (seat: Seat) => {
        if (isPayment) return;
        setSelectedSeats((prevSelected) => {
            if (prevSelected.find((s) => s.id === seat.id)) {
                return prevSelected.filter((s) => s.id !== seat.id);
            } else {
                return [...prevSelected, seat];
            }
        });
    };

    const handleRemoveSeat = (seatId: string) => {
        if (isPayment) return;
        setSelectedSeats((prevSelected) => prevSelected.filter((s) => s.id !== seatId));
    };

    const fetchFlightById = async (id: string) => {
        if (id) {
            try {
                const data = await getFlightDetails(id as string);
                setFlight(data);
                setNotFound(false);
            } catch (error: any) {
                console.error('Error fetching flight:', { error });
                setNotFound(true);
            }
        }
    };

    const handlePayment = async () => {
        if (!flight || isPayment) return;

        if (!token) {
            toast.info('You must be logged in to pay');
            router.push('/auth/login');
            return;
        }

        const ticketItems: CreateTicketItem[] = selectedSeats.map((seat) => ({
            seatCode: seat.code,
            price: seat.price,
        }));

        const ticketData: CreateTicket = {
            flightId: flight.id,
            ticketItems,
        };

        setIsPayment(true);
        try {
            await createTicket(ticketData, token);
            toast.success('Ticket successfully created!');

            await fetchFlightById(id as string);
            setSelectedSeats([]);
        } catch (error: any) {
            toast.error(error?.message || 'Failed to create ticket');
        } finally {
            setIsPayment(false);
        }
    };

    useEffect(() => {
        fetchFlightById(id as string);
    }, [id]);

    if (notFound) {
        return <div>Flight not found</div>;
    }

    if (!flight) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col">
            <Head>
                <title>Flight Details</title>
            </Head>

            <h1 className="text-4xl font-bold mb-6 text-start">Select your seats</h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="flex-1 relative bg-blue-50 p-4 rounded-lg shadow-md overflow-hidden w-full">
                    <Image
                        src="https://catedraunesco.usmp.edu.pe/wp-content/uploads/2019/11/ayacucho-plaza.jpg"
                        alt="Departure"
                        layout="fill"
                        objectFit="cover"
                        className="opacity-70"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-transparent to-black opacity-100" />
                    <div className="relative z-10 p-4 text-end">
                        <p className="text-lg font-semibold text-blue-300">{flight.departure}</p>
                        <p className="text-gray-300 text-sm">Departure</p>
                        <p className="text-lg font-medium text-blue-300 mb-1">Departure Date:</p>
                        <p className="text-gray-200">{new Date(flight.departureDate).toLocaleString()}</p>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <FaArrowDown className="text-blue-500 text-2xl md:-rotate-90" />
                    <p className="text-gray-600 mt-2">{` ${calculateTimeDifference(flight.departureDate, flight.arrivalDate)}`}</p>
                </div>

                <div className="flex-1 relative bg-green-50 p-4 rounded-lg shadow-md overflow-hidden w-full">
                    <Image
                        src="https://whatatrip.pe/wp-content/uploads/2023/06/miraflores-view.png"
                        alt="Arrival"
                        layout="fill"
                        objectFit="cover"
                        className="opacity-70"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-transparent to-transparent opacity-100" />
                    <div className="relative z-10 p-4">
                        <p className="text-lg font-semibold text-green-300">{flight.arrival}</p>
                        <p className="text-gray-300 text-sm">Arrival</p>
                        <p className="text-lg font-medium text-green-300 mb-1">Arrival Date:</p>
                        <p className="text-gray-200">{new Date(flight.arrivalDate).toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-4 my-8 shadow-md rounded-md overflow-x-hidden">
                <FlightSeats
                    isLoading={isPayment}
                    seats={flight.seats}
                    onSeatSelect={handleSeatSelect}
                    selectedSeats={selectedSeats}
                />
            </div>

            {selectedSeats.length > 0 && (
                <SelectedSeatsBar
                    isLoading={isPayment}
                    onSubmit={handlePayment}
                    selectedSeats={selectedSeats}
                    onRemoveSeat={handleRemoveSeat}
                />
            )}
        </div>
    );
};

export default FlightDetailsComponent;
