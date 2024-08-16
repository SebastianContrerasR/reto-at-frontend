import { chunkArray } from "@/features/common/utils";
import { Seat } from "@/features/flights/types/flight-details";
import { SeatHeader } from "./SeatHeader";
import { SeatMiddle } from "./SeatMiddle";
import { SeatRow } from "./SeatRow";
import { WingIcon } from "./WingIcon";

interface FlightSeatsProps {
    seats: Seat[];
    isLoading: boolean;
    onSeatSelect: (seat: Seat) => void;
    selectedSeats: Seat[];
}

export const FlightSeats: React.FC<FlightSeatsProps> = ({ seats, onSeatSelect, selectedSeats, isLoading }) => {
    const seatRows = chunkArray<Seat>(seats, 6);

    return (
        <div className="overflow-x-hidden">
            <section className="relative flex flex-col mx-auto max-w-[400px] border rounded-full gap-4 px-4 py-32">
                <SeatHeader />
                {seatRows.map((rowSeats, index) => (
                    <>
                        {Math.floor(seatRows.length / 2) === index ? (
                            <SeatMiddle />
                        ) : (
                            <SeatRow
                                key={index}
                                rowNumber={index + 1}
                                seats={rowSeats}
                                selectedSeats={selectedSeats}
                                isLoading={isLoading}
                                onSeatSelect={onSeatSelect}
                            />
                        )}
                    </>
                ))}
                {/* Wing icon */}
                <WingIcon className="absolute top-1/2 transform right-[100%] -translate-y-1/2" />
                <WingIcon className="absolute top-1/2 transform left-[100%] -translate-y-1/2 -scale-x-100" />
            </section>
        </div>
    );

};
