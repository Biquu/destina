import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialTime}) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const radius = 53;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (timeLeft / initialTime) * circumference;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="flex flex-row items-center justify-center w-full">
            <svg className="w-28 h-28">
                <circle
                    className="stroke-blue bg-background-white"
                    strokeWidth="94%"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
                <circle
                    className="stroke-dark-blue bg-background-white"
                    strokeWidth="10%"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                />
                <circle
                    className="fill-transparent stroke-background-white bg-background-white"
                    strokeWidth="31%"
                    r={radius * 1.37}
                    cx="50%"
                    cy="50%"
                />
            </svg>
            <div className="ml-3 text-6xl font-medium text-dark-blue">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
        </div>
    );
};

export default CountdownTimer;
