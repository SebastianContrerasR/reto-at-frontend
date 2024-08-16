import React from 'react';

interface WingIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const WingIcon: React.FC<WingIconProps> = ({
    width = "530",
    height = "549",
    className,
}) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 559 571"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g fill="none">
            <path
                d="M205.01 77.007c-65 .5-105 24.5-105 24.5s-.5 53 5.5 100.5 19.5 96.5 19.5 96.5l182.5-115.5c3-36.5 3-81.5 3-81.5s-40.5-25-105.5-24.5z"
                fill="#fff"
                stroke="#E1E1E1"
                strokeWidth="2"
            />
            <path
                d="M101.01 135.008s36.5-20 104-19.5 104.5 19.5 104.5 19.5M101.01 156.008s36.5-20 104-19.5 104.5 19.5 104.5 19.5"
                stroke="#E1E1E1"
                strokeWidth="2"
            />
            <path
                d="M532.471 40.366l-.034.031-.039.025L1.5 376.275v193.686l556.463-41.426.534-526.054-.045.107a226.956 226.956 0 01-2.626 5.872c-2.151 4.629-4.986 10.284-7.696 14.318-2.712 4.037-6.632 8.437-9.861 11.817a168.532 168.532 0 01-5.345 5.343l-.335.317-.088.082-.022.021-.006.006-.002.001h0l-.035-.037-.306-.329.341.367z"
                fill="#fff"
                stroke="#E1E1E1"
                strokeWidth="2"
            />
            <path
                d="M532.594 40l12.395 16.5-543.99 344m0 26l556.923-351m-.539 433L1 552.5"
                stroke="#E1E1E1"
                strokeWidth="2"
            />
        </g>
    </svg>
);
