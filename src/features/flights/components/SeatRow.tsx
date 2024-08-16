import { Seat } from "@/features/flights/types/flight-details";
import SeatIcon from "./SeatIcon";

interface SeatRowProps {
    rowNumber: number;
    seats: Seat[];
    selectedSeats: Seat[];
    isLoading: boolean;
    onSeatSelect: (seat: Seat) => void;
}

export const SeatRow: React.FC<SeatRowProps> = ({
    rowNumber,
    seats,
    selectedSeats,
    isLoading,
    onSeatSelect,
}) => {
    const getSeatIconClasses = (seat: Seat, isSelected: boolean) => {
        if (seat.status === "free") {
            return `${isSelected
                ? "fill-blue-500 stroke-white"
                : "stroke-blue-500 fill-white hover:fill-blue-400 hover:stroke-white"
                }`;
        }

        if (seat.status === "booked") {
            return "stroke-white fill-gray-400";
        }

        return "";
    };

    const getSeatPositionText = (index: number) => {

        const position = index % 3;
        if (position === 0) return "Window";
        if (position === 1) return "Middle";
        return "Aisle";
    };

    const renderSeat = (seat: Seat, index: number) => {
        const isSelected = !!selectedSeats.find((s) => s.id === seat.id);

        return (
            <div className="flex-1 flex justify-center items-center relative" key={seat.id}>
                <button
                    onClick={() => !isLoading && seat.status === "free" && onSeatSelect(seat)}
                    disabled={seat.status === "booked" || isLoading}
                    className="relative group"
                >
                    <SeatIcon
                        className={`transition-colors duration-100 ${getSeatIconClasses(seat, isSelected)}`}
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block group-hover:transition-opacity group-hover:opacity-100 group-hover:translate-y-2 transition-opacity duration-300 opacity-0 max-w-none">
                        <div className="px-2 py-1 bg-gray-700 text-white text-sm rounded shadow-lg whitespace-no-wrap">
                            {getSeatPositionText(index)}
                        </div>
                    </div>
                </button>
            </div>
        );
    };

    return (
        <div className="flex justify-around">
            {seats.slice(0, 3).map((seat, index) => renderSeat(seat, index))}
            <div className="flex-1 flex justify-center items-center">{rowNumber}</div>
            {seats.slice(3, 6).map((seat, index) => renderSeat(seat, 2 - index))}
        </div>
    );
};
