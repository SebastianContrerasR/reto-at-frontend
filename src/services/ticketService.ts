import { API_URL } from "@/features/common/constants/constants";
import { CreateTicket } from "@/types/create-ticket";
import { Ticket } from "@/types/ticket";

const createHeaders = (token: string | null) => ({
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
});

export const createTicket = async (ticketData: CreateTicket, token: string | null): Promise<void> => {
    const response = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: createHeaders(token),
        body: JSON.stringify(ticketData),
    });

    if (!response.ok) {
        throw new Error('Failed to create ticket');
    }
};

export const getTickets = async (token: string | null): Promise<Ticket[]> => {
    const response = await fetch(`${API_URL}/tickets/me`, {
        headers: createHeaders(token),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch tickets');
    }

    return response.json();
};
