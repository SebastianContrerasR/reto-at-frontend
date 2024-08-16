import { Seat } from "@/features/flights/types/flight-details";

interface SelectedSeatsBarProps {
    selectedSeats: Seat[];
    isLoading: boolean;
    onSubmit: () => void;
    onRemoveSeat: (seatId: string) => void;
}

export const SelectedSeatsBar: React.FC<SelectedSeatsBarProps> = ({
    selectedSeats,
    onSubmit,
    isLoading,
    onRemoveSeat,
}) => {
    const totalAmount = selectedSeats.reduce((total, seat) => total + seat.price, 0);

    return (
        <div className="fixed top-0 bottom-0 right-0 w-[250px] lg:w-[300px] bg-zinc-50 border-l rounded-l-lg shadow-lg flex flex-col justify-between">
            <h1 className="text-blue-500 font-semibold px-4 pt-4 pb">Selected Seats</h1>
            <div className="flex flex-col gap-2 p-4 overflow-y-auto flex-grow">
                {selectedSeats.map((seat) => (
                    <div
                        key={seat.id}
                        className="flex flex-col gap-2 border rounded-lg p-3 bg-white shadow-sm"
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-blue-500 font-semibold">{seat.code}</span>
                            <button
                                onClick={() => onRemoveSeat(seat.id)}
                                className="text-red-500 text-sm font-bold hover:text-red-600 transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                        <div className="text-gray-500 text-sm">
                            <p>Price: ${seat.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-4 border-t rounded-t-lg border-gray-300 p-4 bg-slate-100">
                <div className="flex justify-between">
                    <span className="text-lg font-semibold text-blue-500">Total</span>
                    <span className="text-lg font-semibold">${totalAmount.toFixed(2)}</span>
                </div>
                <button
                    disabled={isLoading}
                    onClick={onSubmit}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Pay
                </button>
            </div>
        </div>
    );
};
