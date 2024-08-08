import { generateTicketPdf } from '@/services/generateTicketPdf';
import { getTickets } from '@/services/ticketService';
import { Ticket } from '@/types/ticket';
import React, { useCallback, useEffect, useState } from 'react';
import Loading from './Loading';
import { useAuth } from '@/features/auth/context/AuthContext';

const TicketList: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { token } = useAuth();

    const fetchTickets = useCallback(async () => {
        try {
            const data = await getTickets(token);
            setTickets(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const handlePrintTicket = async (ticket: Ticket) => {
        try {
            await generateTicketPdf(ticket);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets, token]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="space-y-4 p-4">
            <h1 className="text-2xl font-bold mb-4">Ticket List</h1>
            {tickets.length === 0 ? (
                <p>No tickets found.</p>
            ) : (
                tickets.map((ticket) => {
                    const totalPrice = ticket.ticketItems.reduce((total, item) => total + parseFloat(item.price), 0);

                    return (
                        <div key={ticket.id} className="border p-4 rounded-md shadow-md">
                            <h2 className="text-xl font-semibold">Ticket ID: {ticket.id}</h2>
                            <p><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
                            <p><strong>Status:</strong> {ticket.status}</p>
                            <h3 className="text-lg font-semibold mt-2">Flight Details:</h3>
                            <p><strong>Departure:</strong> {ticket.flight.departure}</p>
                            <p><strong>Arrival:</strong> {ticket.flight.arrival}</p>
                            <p><strong>Departure Date:</strong> {new Date(ticket.flight.departureDate).toLocaleString()}</p>
                            <p><strong>Arrival Date:</strong> {new Date(ticket.flight.arrivalDate).toLocaleString()}</p>
                            <h3 className="text-lg font-semibold mt-2">Seats:</h3>
                            <ul className="list-disc ml-5">
                                {ticket.ticketItems.map((item) => (
                                    <li key={item.id}>
                                        <p><strong>Seat Code:</strong> {item.seatCode}</p>
                                        <p><strong>Price:</strong> ${item.price}</p>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-2"><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
                            <button
                                onClick={() => handlePrintTicket(ticket)}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Print Ticket
                            </button>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default TicketList;
