import { Flight } from "@/features/flights/types/flight";

export enum TicketStatus {
    PENDING = 'pending',
    CANCELED = 'canceled',
    CONFIRMED = 'confirmed',
}

export interface TicketItem {
    id: string;
    seatCode: string;
    price: string;
}

export interface Ticket {
    id: string;
    user: { name: string; };
    flight: Flight;
    createdAt: string;
    status: TicketStatus;
    ticketItems: TicketItem[];
}