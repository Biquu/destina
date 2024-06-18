import React, { useState } from 'react';
import Image from 'next/image';
import { playerImages } from '@/utils';
import { imageAssets } from '@/utils';
import { images } from '@/utils';

const PlayersList = ({ players }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleClick = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className='w-full pl-[50px] h-[100%] flex flex-col relative'>
            <div
                className={`transition-max-height duration-500 ease-in-out overflow-hidden w-full h-[100%] flex flex-col relative p-2 rounded-[20px] ${isCollapsed ? 'max-h-0' : 'max-h-[1000px]'}`}
            >
                <h2 className="font-bold m-4 flex justify-center items-center text-blue text-2xl font-medium mb-2">Oyuncular</h2>
                <div className="flex flex-col bg-blue/[.33] rounded-[20px] flex-1 relative ">
                    <div className='flex flex-row justify-center items-center ml-4 mr-4 mt-2'>
                        <Image src={imageAssets.ArrowWhite} className="w-4" onClick={handleClick} />
                    </div>
                    <ul className='pl-4 pr-4 pt-4'>
                        {players.map((player, index) => (
                            <li key={index} className="flex flex-row items-center mb-2">
                                <Image
                                    src={images[player?.profileImage]?.src || '/default-profile.png'} // Fallback to default profile image
                                    alt={player?.name || 'Unknown'}
                                    width={40}
                                    height={40}
                                    className="rounded-full mr-2"
                                />
                                <span className="text-blue text-l font-medium relative w-full">
                                    {player?.username || 'Unknown'}
                                    <span className="text-blue text-l font-medium left-auto absolute inset-y-0 right-0">
                                        {player?.score || 0} p
                                    </span>
                                </span>
                                {index === 0 && (
                                    <Image
                                        src={imageAssets.Winner}
                                        alt={"Winner"}
                                        className="w-9 rounded-full ml-2 mb-12 absolute"
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className="flex-1"></div>
                    <div className="flex bg-white justify-center items-center h-[40px] rounded-full inset-x-0 bottom-0 shadow-md" onClick={handleClick}>
                        <Image src={imageAssets.People} alt={"People"} className="mr-1 w-10" />
                        <Image src={imageAssets.ArrowBlue} alt={"ArrowBlue"} className="w-4" />
                    </div>
                </div>
            </div>

            <div
                className={`transition-max-height duration-500 ease-in-out overflow-hidden h-[100%] relative top-0 flex w-full justify-center flex ${!isCollapsed ? 'max-h-0' : 'max-h-[100px]'}`}
            >
                <div className="flex bg-white justify-center items-center h-[40px] pl-3 pr-3 rounded-full shadow-md" onClick={handleClick}>
                    <Image src={imageAssets.People} alt={"People"} className="mr-1 w-10" />
                    <Image src={imageAssets.ArrowBlue} alt={"ArrowBlue"} className="w-4 rotate-180" />
                </div>
            </div>
        </div>
    );
};

export default PlayersList;
