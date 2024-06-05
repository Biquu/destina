import React from 'react';

const ChatBox = () => {
    return (
        <div className="flex flex-col w-1/5 bg-light-blue p-4 rounded-lg ">
            <h2 className="text-xl font-bold mb-4">Sohbet</h2>
            <div className="flex-1 bg-white rounded-lg p-2 mb-4">
                {/* Chat messages will go here */}
            </div>
            <div className="flex">
                <input className="flex-1 p-2 rounded-lg border border-gray-300" type="text" placeholder="Type a message"/>
                <button className="ml-2 bg-teal-500 text-white px-4 py-2 rounded-lg">Send</button>
            </div>
        </div>
    );
};

export default ChatBox;