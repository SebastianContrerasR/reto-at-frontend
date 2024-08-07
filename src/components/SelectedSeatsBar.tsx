import { Seat } from "@/types/flight-details";

interface SelectedSeatsBarProps {
    selectedSeats: Seat[];
    isLoading: boolean;
    onSubmit: () => void;
}

export const SelectedSeatsBar: React.FC<SelectedSeatsBarProps> = ({ selectedSeats, onSubmit, isLoading }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-50 border rounded-lg shadow-lg p-4 flex justify-between items-center">
            <div>
                {selectedSeats.map((seat) => (
                    <span key={seat.id} className="mr-2">
                        {seat.code}
                    </span>
                ))}
            </div>
            <button disabled={isLoading} onClick={onSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
                Pagar
            </button>
        </div>
    );
};
