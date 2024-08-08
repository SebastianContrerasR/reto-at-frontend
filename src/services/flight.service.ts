import { API_URL } from "@/features/common/constants/constants";
import { FlightDetails } from "@/types/flight-details";

export const getFlightDetails = async (id: string): Promise<FlightDetails> => {
    const res = await fetch(`${API_URL}/flights/${id}/details`);
    if (!res.ok) {
        throw new Error('Failed to fetch flight');
    }
    return res.json();
};

export const getFlights = async (): Promise<FlightDetails[]> => {
    const res = await fetch(`${API_URL}/flights`);
    if (!res.ok) {
        throw new Error('Failed to fetch flight');
    }
    return res.json();
};