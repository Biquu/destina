import React, { useState } from 'react';
import Image from 'next/image';
import { playerImages } from '@/utils';
import { imageAssets } from '@/utils';


const rouletteBox = ({finalTopic }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleClick = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleLeaveClick = () => {
    };


    return (
        <div className='flex flex-row items-center justify-center'>
            <div className='flex-1 pl-[25px] pr-[25px] relative  '>
                <div className=" relative mt-6">
                    <Image src={imageAssets.Colors} alt={"Colors"} className="absolute animate-spin-slow ml-[28%] w-[45%]" />
                    <Image src={imageAssets.Roulette} alt={"Roulette"} className="absolute ml-[27%] w-[47%]" />
                </div>
            </div >
            <div className="bg-darkest-orange absolute rounded-full flex justify-center items-center bottom-28 animate-appear-slow  ">
                <h2 className="font-bold flex justify-center items-center text-background-white text-4xl font-medium pl-8 pr-8 p-2">
                    {finalTopic}
                </h2>
            </div>
            <div className='flex justify-center items-center absolute cursor-pointer mt-4 bottom-20' onClick={handleLeaveClick}>
                <h1 className="flex justify-center text-darkest-orange text-xl font-medium">Ayrıl</h1>
                <Image src={imageAssets.Leave} alt="Leave" className=' w-[20px] ml-2' />
            </div>
        </div>
    );
};

export default rouletteBox ;
