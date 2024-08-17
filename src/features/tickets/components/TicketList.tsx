import { useAuth } from '@/features/auth/context/AuthContext';
import Loading from '@/features/common/components/Loading';
import { getTickets } from '@/features/tickets/services/ticket.service';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { Ticket } from '../types/ticket';
import TicketDetailsToPrint from './TicketDetails';

const TicketList: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { token } = useAuth();
    const componentRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets, token]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="space-y-8 bg-slate-100 p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Tickets</h1>
            {tickets.length === 0 ? (
                <p className="text-center text-gray-500">No tickets found.</p>
            ) : (
                tickets.map((ticket: Ticket) => (
                    <div key={ticket.id} className="relative">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 z-10">
                            <ReactToPrint
                                trigger={() => (
                                    <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition duration-300">
                                        Print Ticket
                                    </button>
                                )}
                                content={() => componentRef.current}
                            />
                        </div>
                        <div ref={componentRef} className="mt-12">
                            <TicketDetailsToPrint ticket={ticket} />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TicketList;
