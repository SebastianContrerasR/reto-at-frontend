import { Seat } from "@/features/flights/types/flight-details";

interface SelectedSeatsBarProps {
    selectedSeats: Seat[];
    isLoading: boolean;
    onSubmit: () => void;
}

export const SelectedSeatsBar: React.FC<SelectedSeatsBarProps> = ({ selectedSeats, onSubmit, isLoading }) => {
    const totalAmount = selectedSeats.reduce((total, seat) => total + seat.price, 0);

    return (
        <div className="w-auto fixed bottom-0 left-0 right-0 bg-zinc-50 border rounded-lg shadow-lg p-4 space-y-4">
            <div className="flex flex-wrap gap-2">
                {selectedSeats.map((seat) => (
                    <span key={seat.id} className="whitespace-nowrap">
                        {seat.code}
                    </span>
                ))}
            </div>
            <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">
                    Total: ${totalAmount.toFixed(2)}
                </span>
                <button disabled={isLoading} onClick={onSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Pay
                </button>
            </div>
        </div>
    );
};
