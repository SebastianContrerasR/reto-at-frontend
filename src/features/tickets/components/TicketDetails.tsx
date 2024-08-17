import React, { forwardRef } from 'react';
import { format } from 'date-fns';
import { FaPlane } from 'react-icons/fa';
import { Ticket } from '../types/ticket';

const TicketDetailsToPrint = forwardRef<HTMLDivElement, { ticket: Ticket }>(
    ({ ticket }, ref) => {
        const departureDate = format(new Date(ticket.flight.departureDate), 'dd-MMM-yyyy');
        const arrivalDate = format(new Date(ticket.flight.arrivalDate), 'dd-MMM-yyyy');
        const departureTime = format(new Date(ticket.flight.departureDate), 'HH:mm');
        const boardingTime = format(new Date(new Date(ticket.flight.departureDate).getTime() - 60 * 60 * 1000), 'HH:mm');
        const arrivalTime = format(new Date(ticket.flight.arrivalDate), 'HH:mm');
        const gate = Math.floor(Math.random() * 25) + 1;

        return (
            <div ref={ref} className='overflow-x-auto px-8'>
                <div className="min-w-[600px] max-w-[700px] mx-auto bg-white border-transparent border-red-600 rounded-[38px] shadow-lg relative">
                    <div className="absolute left-[calc(75%-8px)] top-0 h-full w-px border-r-[16px] border-dotted border-slate-200"></div>

                    <div className='flex'>
                        <h1 className='w-3/4 text-4xl bg-blue-400 text-white font-bold rounded-ss-[38px] px-8 py-4'>Ticket Pass</h1>
                        <div className="w-1/4 flex bg-blue-500 text-white items-center justify-between font-bold text-xs rounded-se-[38px] px-4 py-2">
                            <div>{ticket.flight.departure.toUpperCase()}</div>
                            <FaPlane size={24} />
                            <div>{ticket.flight.arrival.toUpperCase()}</div>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="w-3/4 p-4 flex flex-col justify-between">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="">
                                    <div className="text-sm font-semibold text-gray-500">Passenger</div>
                                    <div className="text-xl font-bold text-gray-800">{ticket.user.name}</div>
                                </div>
                                <div className="justify-self-end">
                                    <div className="text-sm font-semibold text-gray-500">Departure Date</div>
                                    <div className="text-xl font-bold text-gray-800">{departureDate}</div>
                                </div>
                                <div className="">
                                    <div className="text-sm font-semibold text-gray-500">Seats</div>
                                    <div className="text-xl font-bold text-gray-800">
                                        {ticket.ticketItems.map((item) => item.seatCode).join(', ')}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-around text-2xl font-bold text-gray-800 mb-4">
                                <div>{ticket.flight.departure.toUpperCase()}</div>
                                <FaPlane size={48} />
                                <div>{ticket.flight.arrival.toUpperCase()}</div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-lg font-semibold text-gray-700">
                                <div>
                                    <div className="text-sm font-semibold text-gray-500">Departure Time</div>
                                    <div>{departureTime}</div>
                                </div>
                                <div className='justify-self-center'>
                                    <div className="text-sm font-semibold text-gray-500">Boarding Time</div>
                                    <div>{boardingTime}</div>
                                </div>
                                <div className="justify-self-center">
                                    <div className="text-sm font-semibold text-gray-500">Gate</div>
                                    <div>{gate}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-500">Arrival Time</div>
                                    <div>{arrivalTime}</div>
                                </div>
                                <div className='justify-self-center'>
                                    <div className="text-sm font-semibold text-gray-500">Arrival Date</div>
                                    <div>{arrivalDate}</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/4 pl-4 flex flex-col justify-between p-4">
                            <div className="text-xs font-semibold text-gray-500">Passenger</div>
                            <div className="text-base font-bold text-gray-800">{ticket.user.name}</div>

                            <div className="text-xs font-semibold text-gray-500 mt-2">Departure Date</div>
                            <div className="text-base font-bold text-gray-800">{departureDate}</div>

                            <div className="text-xs font-semibold text-gray-500 mt-2">Seats</div>
                            <div className="text-base font-bold text-gray-800">
                                {ticket.ticketItems.map((item) => item.seatCode).join(', ')}
                            </div>

                            <div className="text-xs font-semibold text-gray-500 mt-4">{ticket.flight.departure.toUpperCase()}</div>
                            <div className="text-lg font-bold text-gray-800">{ticket.flight.arrival.toUpperCase()}</div>

                            <div className="grid grid-cols-1 gap-2 text-sm font-semibold text-gray-700 mt-4">
                                <div>
                                    <div className="text-xs font-semibold text-gray-500">Dep. Time</div>
                                    <div>{departureTime}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-gray-500">Board. Time</div>
                                    <div>{boardingTime}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-gray-500">Gate</div>
                                    <div>{gate}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-gray-500">Arr. Time</div>
                                    <div>{arrivalTime}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex'>
                        <h1 className='w-3/4 text-4xl bg-blue-400 text-white font-bold rounded-es-[38px] px-8 py-4'></h1>
                        <div className="w-1/4 flex bg-blue-500 text-white items-center justify-between font-bold text-xs rounded-ee-[38px] px-4 py-2">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

TicketDetailsToPrint.displayName = 'TicketDetailsToPrint';

export default TicketDetailsToPrint;
