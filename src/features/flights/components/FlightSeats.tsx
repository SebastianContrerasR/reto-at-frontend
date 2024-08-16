import { Seat } from "@/features/flights/types/flight-details";
import SeatIcon from "./SeatIcon";

interface FlightSeatsProps {
    seats: Seat[];
    isLoading: boolean;
    onSeatSelect: (seat: Seat) => void;
    selectedSeats: Seat[];
}

const getSeatIconClasses = (seat: Seat, isSelected: boolean) => {
    if (seat.status === 'free') {
        return `stroke-blue-500 fill-white hover:fill-blue-400 hover:stroke-white ${isSelected ? 'fill-blue-500 stroke-white' : ''
            }`;
    }

    if (seat.status === 'booked') {
        return 'stroke-white fill-gray-400';
    }

    return '';
};

export const FlightSeats: React.FC<FlightSeatsProps> = ({ seats, onSeatSelect, selectedSeats, isLoading }) => {

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
            {seats.map((seat) => {
                const isSelected = !!selectedSeats.find((s) => s.id === seat.id);

                return (
                    <div key={seat.id} className="flex justify-center items-center">
                        <button
                            onClick={() => !isLoading && seat.status === 'free' && onSeatSelect(seat)}
                            disabled={seat.status === 'booked' || isLoading}
                        >
                            <SeatIcon
                                className={`transition-colors duration-100 ${getSeatIconClasses(seat, isSelected)}`}
                            />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
