import { useAuth } from '@/features/auth/context/AuthContext';
import Loading from '@/features/common/components/Loading';
import { FlightSeats } from '@/features/flights/components/FlightSeats';
import { SelectedSeatsBar } from '@/features/flights/components/SelectedSeatsBar';
import { getFlightDetails } from '@/features/flights/services/flight.service';
import { createTicket } from '@/features/tickets/services/ticket.service';
import { CreateTicket, CreateTicketItem } from '@/features/tickets/types/create-ticket';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { FlightDetails, Seat } from '../types/flight-details';
import { WingIcon } from './WingIcon';

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
        <div className="flex flex-col gap-8">
            <div className="mb-8">
                <Head>
                    <title>Flight Details</title>
                </Head>
                <div className="bg-white p-4 shadow-md rounded-md">
                    <h1 className="text-2xl font-bold mb-4">{'Detail Flight'}</h1>
                    <p><strong>Departure:</strong> {flight.departure}</p>
                    <p><strong>Arrival:</strong> {flight.arrival}</p>
                    <p><strong>Departure Date:</strong> {new Date(flight.departureDate).toLocaleString()}</p>
                    <p><strong>Arrival Date:</strong> {new Date(flight.arrivalDate).toLocaleString()}</p>
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
        </div>
    );
};

export default FlightDetailsComponent;
