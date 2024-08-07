import { FlightSeats } from '@/components/FlightSeats';
import Loading from '@/components/Loading';
import { SelectedSeatsBar } from '@/components/SelectedSeatsBar';
import { USER_ID } from '@/services/constant';
import { getFlightDetails } from '@/services/flightService';
import { createTicket } from '@/services/ticketService';
import { CreateTicket, CreateTicketItem } from '@/types/create-ticket';
import { FlightDetails, Seat } from '@/types/flight-details';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const FlightPage = () => {
    const router = useRouter();
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
            await createTicket(ticketData);
            alert('Ticket successfully created!');

            await fetchFlightById(id as string);
            setSelectedSeats([]);
        } catch (error) {
            console.error('Error creating ticket:', error);
            alert('Failed to create ticket');
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
            <Link href="/">
                <span className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block">
                    Back to Flights List
                </span>
            </Link>
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
    );
};

export default FlightPage;
