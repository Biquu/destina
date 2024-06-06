import React, { useState } from 'react';
import Image from 'next/image';
import { playerImages } from '@/utils';
import { imageAssets } from '@/utils';


const storyBox = ({}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleClick = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleLeaveClick = () => {
    };


    return (
        <div className='w-full flex flex-1 pl-[25px] pr-[25px] flex-col relative'>
            <h2 className="font-bold m-4 flex justify-center items-center text-blue text-2xl font-medium mb-2">Arkadaşlarına Ne Anlatacaksın?</h2>

        </div>
    );
};

export default storyBox;
