import { FlightSeats } from '@/components/FlightSeats';
import Loading from '@/components/Loading';
import { SelectedSeatsBar } from '@/components/SelectedSeatsBar';
import { useAuth } from '@/features/auth/context/AuthContext';
import MainLayout from '@/features/common/layouts/MainLayout';
import { USER_ID } from '@/services/constant';
import { getFlightDetails } from '@/services/flight.service';
import { createTicket } from '@/services/ticketService';
import { CreateTicket, CreateTicketItem } from '@/types/create-ticket';
import { FlightDetails, Seat } from '@/types/flight-details';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const FlightPage = () => {
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

    const fetchFlightById = async (id: string) => {

        if (id) {
            try {
                const data = await getFlightDetails(id as string);
                setFlight(data);
                setNotFound(false);
            } catch (error: any) {
                console.error(' ddddError fetching flight:', { error });
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
            userId: USER_ID,
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
        <MainLayout>
            <div className="flex flex-col gap-8">
                <div className='mb-8'>
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
                    <div className="bg-white p-4 shadow-md rounded-md">

                        <h1 className="text-2xl font-bold mb-4">{'Select seats'}</h1>
                        <div className="overflow-x-auto">
                            <div className="grid grid-cols-1 gap-4">
                                <FlightSeats
                                    isLoading={isPayment}
                                    seats={flight.seats}
                                    onSeatSelect={handleSeatSelect}
                                    selectedSeats={selectedSeats}
                                />
                            </div>
                        </div>
                    </div>

                    {selectedSeats.length > 0 && (
                        <SelectedSeatsBar isLoading={isPayment} onSubmit={handlePayment} selectedSeats={selectedSeats} />
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default FlightPage;
