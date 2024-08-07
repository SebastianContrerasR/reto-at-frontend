export interface CreateTicket {
    userId: string;
    flightId: string;
    ticketItems: CreateTicketItem[];
}

export interface CreateTicketItem {
    seatCode: string;
    price: number;
}