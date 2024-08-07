import React from 'react';

const FloatingButton = ({ seats }: { seats: string[] }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-md flex justify-between items-center">
            <div>
                Asientos seleccionados: {seats.join(', ')}
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Pagar
            </button>
        </div>
    );
};

export default FloatingButton;
