import React, { useState } from 'react';
import Image from 'next/image';
import { playerImages } from '@/utils';
import { imageAssets } from '@/utils';
import { images } from '@/utils';

const GuessBox = ({ playerInfo, onSendGuess, guesses }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [guess, setGuess] = useState('');

    const handleClick = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleGuessSend = () => {
        if (guess.trim() !== '') {
            onSendGuess(guess);
            setGuess('');
        }
    };

    const handleLeaveClick = () => {
    };

    return (
        <div className='w-full flex flex-1 pl-[25px] pr-[25px] flex-col relative'>
            <div
                className={`transition-max-height duration-500 ease-in-out overflow-hidden  w-full h-[100%] flex flex-col relative p-2  rounded-[20px] ${isCollapsed ? 'max-h-0' : 'max-h-[1000px]'}`}
            >
                <h2 className="font-bold m-4 flex justify-center items-center text-blue text-2xl font-medium mb-2">Tahmin Et</h2>
                <div className='flex justify-center items-center cursor-pointer absolute right-0 mt-4 mr-4' onClick={handleLeaveClick}>
                    <h1 className="flex justify-center text-darkest-orange text-xl font-medium">Ayrıl</h1>
                    <Image src={imageAssets.Leave} alt="Leave" className=' w-[20px] ml-2' />
                </div>
                <div className="flex flex-col bg-orange/[.33] rounded-[20px] flex-1 relative ">
                    <div className='flex flex-row justify-center items-center ml-4 mr-4 mt-2'>
                        <Image src={imageAssets.ArrowWhite} className="w-4" onClick={handleClick} />
                    </div>
                    <div className='flex flex-row items-center ml-4 mr-4 relative'>
                        <Image src={images[playerInfo?.profileImage]?.src || playerImages['Male5']?.src}  width={40} height={40} className="rounded-full mr-2" />
                        <span className="text-blue text-l font-medium relative">{playerInfo[0].name}</span>
                        <Image src={imageAssets.Voice} width={40} height={40} className="w-4 ml-2" />
                        <div className=' bg-darkest-orange absolute right-0 rounded-full flex justify-center items-center'>
                            <h2 className="font-bold flex justify-center items-center text-background-white text-xl font-medium pl-4 pr-4 p-1">Felsefe</h2>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {guesses.map((msg, index) => (
                            <div key={index} className="pl-2 text-blue">
                                <strong>{msg.user}</strong>: {msg.message}
                            </div>
                        ))}
                    </div>
                    <div className="flex bg-white justify-center items-center h-[40px] rounded-full inset-x-0 bottom-0 shadow-md ">
                        <Image src={imageAssets.Chat} alt={"People"} className="mr-1 w-6 ml-4"/>
                        <input 
                            className="w-[95%] ml-1 focus:outline-none focus:ring-0 text-dark-blue" 
                            type="text" 
                            placeholder="Bir metin giriniz." 
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') handleGuessSend();
                            }}
                        />
                        <Image src={imageAssets.ArrowBlue} alt={"ArrowBlue"} className="w-4 rotate-[270deg] mr-4" onClick={handleGuessSend}/>
                    </div>
                </div>
            </div>

            <div
                className={`transition-max-height duration-500 ease-in-out overflow-hidden h-[100%] relative top-0 flex w-full justify-center flex ${!isCollapsed ? 'max-h-0' : 'max-h-[100px]'}`}
            >
                <div className="flex bg-white justify-center items-center h-[40px] pl-3 pr-3 rounded-full shadow-md " onClick={handleClick}>
                    <Image src={imageAssets.Chat} alt={"People"} className="mr-1 w-6" />
                    <Image src={imageAssets.ArrowBlue} alt={"ArrowBlue"} className="w-4 rotate-180" />
                </div>
            </div>
        </div>
    );
};

export default GuessBox;
