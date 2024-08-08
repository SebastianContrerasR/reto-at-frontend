import { Seat } from "@/features/flights/types/flight-details";

interface FlightSeatsProps {
    seats: Seat[];
    isLoading: boolean;
    onSeatSelect: (seat: Seat) => void;
    selectedSeats: Seat[];
}

export const FlightSeats: React.FC<FlightSeatsProps> = ({ seats, onSeatSelect, selectedSeats, isLoading }) => {
    const getStatusClass = (status: 'free' | 'booked') => {
        switch (status) {
            case 'free':
                return 'bg-blue-500 hover:bg-blue-600';
            case 'booked':
                return 'bg-gray-500 cursor-not-allowed opacity-70';
            default:
                return '';
        }
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
            {seats.map((seat) => (
                <div key={seat.id} className="flex justify-center items-center">
                    <button
                        onClick={() => !isLoading && seat.status === 'free' && onSeatSelect(seat)}
                        className={`p-4 text-white font-semibold border rounded-md ${getStatusClass(seat.status)} ${selectedSeats.find((s) => s.id === seat.id) ? 'ring-2 ring-blue-800 bg-blue-700' : ''}`}
                        disabled={seat.status === 'booked' || isLoading}
                    >
                        {seat.code}

                    </button>
                </div>
            ))}
        </div>
    );
};