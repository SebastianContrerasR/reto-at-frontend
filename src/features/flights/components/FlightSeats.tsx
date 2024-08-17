import { chunkArray } from "@/features/common/utils";
import { Seat } from "@/features/flights/types/flight-details";
import { SeatHeader } from "./SeatHeader";
import { SeatMiddle } from "./SeatMiddle";
import { SeatRow } from "./SeatRow";
import { WingIcon } from "./WingIcon";
import { Fragment } from "react";

interface FlightSeatsProps {
    seats: Seat[];
    isLoading: boolean;
    onSeatSelect: (seat: Seat) => void;
    selectedSeats: Seat[];
}

export const FlightSeats: React.FC<FlightSeatsProps> = ({ seats, onSeatSelect, selectedSeats, isLoading }) => {
    const seatRows = chunkArray<Seat>(seats, 6);

    return (
        <section className="bg-white relative flex flex-col mx-auto max-w-[400px] border-2 rounded-full gap-4 px-4 py-32">
            <SeatHeader />
            {seatRows.map((rowSeats, index) => (
                <Fragment key={`seat-row-${index}`}>
                    {Math.floor(seatRows.length / 2) === index && (
                        <SeatMiddle />
                    )}
                    <SeatRow
                        rowNumber={index + 1}
                        seats={rowSeats}
                        selectedSeats={selectedSeats}
                        isLoading={isLoading}
                        onSeatSelect={onSeatSelect}
                    />
                </Fragment>
            ))}
            {/* Wing icon */}
            <WingIcon className="absolute top-1/2 transform right-[100%] -translate-y-1/2" />
            <WingIcon className="absolute top-1/2 transform left-[100%] -translate-y-1/2 -scale-x-100" />
        </section>
    );

};
