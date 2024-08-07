import { Flight } from "./flight";

export interface TicketItem {
    id: string;
    seatCode: string;
    price: string;
}

export interface Ticket {
    id: string;
    userId: string;
    flight: Flight;
    createdAt: string;
    status: string;
    ticketItems: TicketItem[];
}