import React from 'react';

interface SeatIconProps {
    width?: string;
    height?: string;
    fillColor?: string;
    strokeColor?: string;
    className?: string;
}

const SeatIcon: React.FC<SeatIconProps> = ({
    width = "36",
    height = "45",
    className = ""
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 39 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M38 35C38 30.5817 34.4183 27 30 27H8C3.58172 27 0 30.5817 0 35V37C0 41.4183 3.58172 45 8 45H30C34.4183 45 38 41.4183 38 37V35Z"
                fill="#E1E1E1"
                stroke='transparent'
            />
            <path
                d="M34.5 8C34.5 3.85786 31.1421 0.5 27 0.5H11C6.85786 0.5 3.5 3.85786 3.5 8V37C3.5 37.8284 4.17157 38.5 5 38.5H33C33.8284 38.5 34.5 37.8284 34.5 37V8Z"
            />
            <path
                d="M5.5 19C5.5 17.6193 4.38071 16.5 3 16.5C1.61929 16.5 0.5 17.6193 0.5 19V33.6667C0.5 36.336 2.66396 38.5 5.33333 38.5C5.42538 38.5 5.5 38.4254 5.5 38.3333V19Z"
            />
            <path
                d="M37.5 19C37.5 17.6193 36.3807 16.5 35 16.5C33.6193 16.5 32.5 17.6193 32.5 19V38.3333C32.5 38.4254 32.5746 38.5 32.6667 38.5C35.336 38.5 37.5 36.336 37.5 33.6667V19Z"
            />
            <path
                d="M32.5 32.8397C32.5 31.8099 32.0405 30.9221 31.2037 30.5386C29.3535 29.6905 25.5847 28.5 19 28.5C12.4153 28.5 8.64651 29.6905 6.7963 30.5386C5.95952 30.9221 5.5 31.8099 5.5 32.8397V38.5H32.5V32.8397Z"
            />
        </svg>
    );
};

export default SeatIcon;
