import React from 'react';
import Image from 'next/image';
import { playerImages } from '@/utils';

const PlayersList = ({ players }) => {
    return (
        <div className='w-1/5 ml-[50px] h-[100%]'>
            <h2 className="font-bold m-4 flex justify-center items-center text-blue text-2xl font-medium mb-2">Oyuncular</h2>
            <div className="flex flex-col bg-blue/[.33] p-4 rounded-[33px]">
                <ul>
                    {players.map((player, index) => (
                        <li key={index} className="flex items-center mb-2">
                            <Image src={playerImages[player.profilePicture]} alt={player.name} width={40} height={40} className="rounded-full mr-2" />
                            <span>{player.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PlayersList;