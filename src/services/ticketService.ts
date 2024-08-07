import { CreateTicket } from "@/types/create-ticket";
import { API_URL, USER_ID } from "./constant";
import { Ticket } from "@/types/ticket";

export const createTicket = async (ticketData: CreateTicket): Promise<void> => {
    const response = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
    });

    if (!response.ok) {
        throw new Error('Failed to create ticket');
    }
};

export const getTickets = async (): Promise<Ticket[]> => {
    const res = await fetch(`${API_URL}/tickets/me/${USER_ID}`);
    if (!res.ok) {
        throw new Error('Failed to fetch Tickets');
    }
    return res.json();
};