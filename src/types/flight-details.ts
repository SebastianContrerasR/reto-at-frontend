export interface FlightDetails {
    id: string;
    departure: string;
    arrival: string;
    departureDate: string;
    arrivalDate: string;
    seats: Seat[];
}

export interface Seat {
    id: string;
    code: string;
    price: number;
    status: 'free' | 'booked';
}
