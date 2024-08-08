export interface CreateTicket {
    flightId: string;
    ticketItems: CreateTicketItem[];
}

export interface CreateTicketItem {
    seatCode: string;
    price: number;
}