import { Seat } from "@/features/flights/types/flight-details";
import SeatIcon from "./SeatIcon";

interface SeatRowProps {
    rowNumber: number;
    seats: Seat[];
    selectedSeats: Seat[];
    isLoading: boolean;
    onSeatSelect: (seat: Seat) => void;
}

export const SeatRow: React.FC<SeatRowProps> = ({ rowNumber, seats, selectedSeats, isLoading, onSeatSelect }) => {
    const getSeatIconClasses = (seat: Seat, isSelected: boolean) => {
        if (seat.status === 'free') {
            return `${isSelected ? 'fill-blue-500 stroke-white' : 'stroke-blue-500 fill-white hover:fill-blue-400 hover:stroke-white'
                }`;
        }

        if (seat.status === 'booked') {
            return 'stroke-white fill-gray-400';
        }

        return '';
    };


    const renderSeat = (seat: Seat) => {
        const isSelected = !!selectedSeats.find((s) => s.id === seat.id);

        return (
            <div
                className="flex-1 flex justify-center items-center"
            >

                <button
                    key={seat.id}
                    onClick={() => !isLoading && seat.status === 'free' && onSeatSelect(seat)}
                    disabled={seat.status === 'booked' || isLoading}
                >
                    <SeatIcon
                        className={`transition-colors duration-100 ${getSeatIconClasses(seat, isSelected)}`}
                    />
                </button>
            </div>
        );
    };

    return (
        <div className="flex justify-around">
            {seats.slice(0, 3).map(renderSeat)}
            <div className="flex-1 flex justify-center items-center">{rowNumber}</div>
            {seats.slice(3, 6).map(renderSeat)}
        </div>
    );
};