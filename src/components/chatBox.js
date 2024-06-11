import React, { useState } from 'react';
import Image from 'next/image';
import { playerImages } from '@/utils';
import { imageAssets } from '@/utils';

const ChatBox = ({ onSendMessage, messages }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [message, setMessage] = useState('');

    const handleClick = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleMessageSend = () => {
        if (message.trim() !== '') {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <div className='w-full pr-[50px] h-[100%] flex flex-col relative'>
            <div
                className={`transition-max-height duration-500 ease-in-out overflow-hidden  w-full h-[100%] flex flex-col relative p-2  rounded-[20px] ${isCollapsed ? 'max-h-0' : 'max-h-[1000px]'}`}
            >
                <h2 className="font-bold m-4 flex justify-center items-center text-blue text-2xl font-medium mb-2">Sohbet</h2>
                <div className="flex flex-col bg-blue/[.33] rounded-[20px] flex-1 relative ">
                    <div className='flex flex-row justify-center items-center ml-4 mr-4 mt-2'>
                        <Image src={imageAssets.ArrowWhite} className="w-4" onClick={handleClick} />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {messages.map((msg, index) => (
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
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleMessageSend();
                                }
                            }}
                        />
                        <Image
                            src={imageAssets.ArrowBlue}
                            alt={"ArrowBlue"}
                            className="w-4 rotate-[270deg] mr-4"
                            onClick={handleMessageSend}
                        />
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

export default ChatBox;
