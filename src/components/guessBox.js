import React from 'react';

const GuessBox = () => {
    return (
        <div className="flex flex-col w-3/5 bg-beige p-4 rounded-lg mx-4">
            <h2 className="text-xl font-bold mb-4">Tahmin Et</h2>
            <div className="flex justify-between items-center bg-orange-100 p-2 rounded-lg">
                <span>Lila</span>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-full">Felsefe</button>
            </div>
        </div>
    );
};

export default GuessBox;
