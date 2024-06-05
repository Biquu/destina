'use client';

import React, { useState } from 'react';
import Header from '../../components/header'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import '../styles/main.css';
import { imageAssets } from '@/utils';
import { playerImages } from '@/utils';


export default function homePage() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupRoom, setShowPopupRoom] = useState(false);
  const [showGames, setShowGames] = useState(false);
  const [selectedGame, setSelectedGame] = useState(1);


  const roomInf = [
    { roomCode: "QZW32R", roomId: "1235431iu491931w112" },
  ]

  const playerInfo = [{ name: "Michael", profilePicture: "Male2" },]

  const players = [
    { name: "Helen", profilePicture: "Female1" },
    { name: "Lila", profilePicture: "Female2" },
    { name: "Joe", profilePicture: "Male1" },
    { name: "Michael", profilePicture: "Male2" }
  ];


  const handlePlayRandom = () => {
    console.log('Play Random Game');
    setShowGames(true); // Show the popup when the button is clicked
  };

  const handleCloseGames = () => {
    setShowGames(false); // Close the popup
  };

  const handlePlayWithFriends = () => {
    setShowPopup(true); // Show the popup when the button is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
  };

  const handleJoinRoom = () => {
    setShowPopupRoom(true); // Show the popup when the button is clicked
  };

  const handleClosePopupRoom = () => {
    setShowPopupRoom(false); // Close the popup
  };

  const handleLeaveClick = () => {
    setShowPopupRoom(false); // Close the popup
  };


  const handleCopyRoomCode = () => {
    navigator.clipboard.writeText(roomInf[0].roomCode)
      .then(() => {
        console.log('Room code copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="main-page">
      <Header playerInfo={playerInfo} />
      <div className="flex flex-col justify-center min-h-[90vh]">
        <div className="flex justify-center mb-[6%] ml-[12%] mr-[12%]">
          <div className="mr-14 flex justify-center min-w-[200px]">
            <Image src={imageAssets.Lion} alt="Lion" className='min-w-[200px]' />
          </div>
          <div className="buttons w-[300px]">
            {!showGames && <button type="submit" onClick={handlePlayRandom}>ODA BUL</button>}
            {showGames &&
              <div>
                <div className="fixed inset-0 bg-background-white bg-opacity-55 flex justify-center items-center" onClick={handleCloseGames}>
                </div>
                <div className="fixed relative">
                  <button type="submit" onClick={handlePlayRandom}>DEVAM ET</button>
                </div>

              </div>}
            {showGames &&
              <div className='fixed flex justify-center items-center'>
                <div className="fixed relative top-[30px] right-[30px]">
                  <div
                    className={`bg-orange flex justify-center items-center rounded-full w-[75px] h-[75px] absolute bottom-[200px] right-[155px] shadow-lg hover:shadow-orange/50 ${selectedGame === 1 ? 'opacity-100 shadow-orange' : 'opacity-30'}`}
                    onClick={() => setSelectedGame(1)}
                  >
                    <h1 className="flex justify-center text-background-white text-xl font-normal  pl-3 tracking-tight leading-none">3 Kişi 10 dk.</h1>
                  </div>
                  <div
                    className={`bg-dark-orange flex justify-center items-center rounded-full w-[75px] h-[75px] absolute bottom-[240px] right-[0px] shadow-lg hover:shadow-orange/50 ${selectedGame === 2 ? 'opacity-100 shadow-orange' : 'opacity-30'}`}
                    onClick={() => setSelectedGame(2)}
                  >
                    <h1 className="flex justify-center text-background-white text-xl font-normal  pl-3 tracking-tight leading-none">4 Kişi 20 dk.</h1>
                  </div>
                  <div
                    className={`bg-dark-orange flex justify-center items-center  rounded-full w-[75px] h-[75px] absolute bottom-[240px] left-[60px] shadow-lg hover:shadow-orange/50  ${selectedGame === 3 ? 'opacity-100 shadow-orange' : 'opacity-30'}`}
                    onClick={() => setSelectedGame(3)}
                  >
                    <h1 className="flex justify-center text-background-white text-xl font-normal  pl-3 tracking-tight leading-none">4 Kişi 25 dk.</h1>
                  </div>
                  <div
                    className={`bg-darkest-orange flex justify-center items-center  rounded-full w-[75px] h-[75px] absolute bottom-[200px] left-[205px] shadow-lg hover:shadow-orange/50  ${selectedGame === 4 ? 'opacity-100 shadow-orange' : 'opacity-30'}`}
                    onClick={() => setSelectedGame(4)}
                  >
                    <h1 className="flex justify-center text-background-white text-xl font-normal  pl-3 tracking-tight leading-none">5 Kişi 35 dk.</h1>
                  </div>
                </div>
              </div>
            }
            <div className="flex text-center w-full">
              <hr className='w-full mt-3 border-blue' />
              <span className='ml-3 mr-3 text-blue'>VEYA</span>
              <hr className='w-full mt-3 border-blue' />
            </div>
            <button type="button" onClick={handlePlayWithFriends}>ARKADAŞLARINLA OYNA</button>
            <p className="w-full max-w-96 text-sm text-blue text-center">
              Oda bul seçeneğini seçerek, sizin için en uygun insanlarla eşleşebilirsiniz. Daha doğru sonuçlar için lütfen oturumlarımızı oylamayı unutmayınız.
            </p>
          </div>
          <div className="ml-14 flex justify-center min-w-[200px]">
            <Image src={imageAssets.Coyote} alt="Coyote" className='min-w-[200px]' />
          </div>
        </div>
      </div>
      {showPopup &&
        <div className='fixed inset-0 flex justify-center items-center'>
          <div className="fixed inset-0 bg-background-white bg-opacity-55 flex justify-center items-center" onClick={handleClosePopup}></div>
          <div className="bg-white fixed flex p-8 rounded-[90px] shadow-lg w-[900px] h-[550px] absolute  justify-between flex-row">
            <div className="flex flex-col space-y-4 w-[45%]">
              <h3 className="flex justify-center text-blue text-xl font-medium  mb-2">Odaya Katıl</h3>
              <input
                type={'text'}
                placeholder={"Oda Kodu"}
                required
                className="mt-1 bg-[#E8EFEC] block w-full border border-dark-blue p-2 rounded-[15px] text-blue placeholder:font-medium placeholder:text-blue px-5"
              />
              <button className="w-full" type="submit" onClick={() => { handleJoinRoom(); handleClosePopup(); }}>KATIL</button>
            </div>
            <div className='border border-dark-blue h-[450px] w-0'></div>
            <div className="flex flex-col space-y-4 w-[45%]">
              <h3 className="flex justify-center text-blue text-xl font-medium  mb-2">Oda Oluştur</h3>
              <div className="fixed relative  flex fle-col mb-10">
                <div
                  className={`bg-orange flex justify-center items-center rounded-full w-[75px] h-[75px] shadow-lg hover:shadow-orange/50  ${selectedGame === 1 ? 'opacity-100 shadow-orange' : 'opacity-30'}`}
                  onClick={() => setSelectedGame(1)}
                >
                  <h1 className="flex justify-center text-background-white text-xl font-normal pl-3 tracking-tight leading-none">3 Kişi 10 dk.</h1>
                </div>
                <div
                  className={`bg-dark-orange flex justify-center items-center rounded-full w-[75px] h-[75px] shadow-lg hover:shadow-orange/50 mt-10  ${selectedGame === 2 ? 'opacity-100 shadow-orange' : 'opacity-30'}`}
                  onClick={() => setSelectedGame(2)}
                >
                  <h1 className="flex justify-center text-background-white text-xl font-normal pl-3 tracking-tight leading-none">4 Kişi 20 dk.</h1>
                </div>
                <div
                  className={`bg-dark-orange flex justify-center items-center  rounded-full w-[75px] h-[75px] shadow-lg hover:shadow-orange/50 ${selectedGame === 3 ? 'opacity-100 shadow-orange' : 'opacity-30'}`}
                  onClick={() => setSelectedGame(3)}
                >
                  <h1 className="flex justify-center text-background-white text-xl font-normal pl-3 tracking-tight leading-none">4 Kişi 25 dk.</h1>
                </div>
                <div
                  className={`bg-darkest-orange flex justify-center items-center  rounded-full w-[75px] h-[75px] shadow-lg hover:shadow-orange/50 mt-10  ${selectedGame === 4 ? 'opacity-100 shadow-orange' : 'opacity-30'}`}
                  onClick={() => setSelectedGame(4)}
                >
                  <h1 className="flex justify-center text-background-white text-xl font-normal pl-3 tracking-tight leading-none">5 Kişi 35 dk.</h1>
                </div>
              </div>
              <button className="w-full mt-10" type="submit" onClick={() => { handleJoinRoom(); handleClosePopup(); }}>ODA OLUŞTUR</button>
            </div>
          </div>
        </div>
      }
      {showPopupRoom &&
        <div className='fixed inset-0 flex justify-center items-center'>
          <div className="fixed inset-0 bg-background-white bg-opacity-55 flex justify-center items-center" onClick={handleClosePopupRoom}></div>
          <div className="bg-white fixed flex p-8 rounded-[90px] shadow-lg w-[900px] h-[550px] absolute  justify-between flex-col">
            <div className="space-y-4 w-[100%] relative">
              <h3 className="flex justify-center items-center text-blue text-xl font-medium mb-2">Arkadaşlarınla Oyna</h3>
              <div className='flex justify-center items-center cursor-pointer absolute right-4 top-[-16px]' onClick={handleLeaveClick}>
                <h1 className="flex justify-center text-darkest-orange text-xl font-medium mb-2">Ayrıl</h1>
                <Image src={imageAssets.Leave} alt="Leave" className=' w-[20px] pb-2 ml-2' />
              </div>
            </div>
            <div className="flex flex-row space-y-4 w-[100%] h-[80%]">
              <div className="flex flex-col space-y-4 w-[100%]">
                <h3 className="flex justify-center items-center text-blue text-xl font-medium mb-2">Oyuncular</h3>
                {players.map((player, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Image
                      src={playerImages[player.profilePicture]}
                      alt={player.name}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <span className="text-blue text-lg">{player.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col w-[100%] justify-center items-center">
                <div className="flex flex-row w-[100%] justify-center items-center ">
                  <h3 className="text-blue text-5xl font-semibold"> {roomInf[0].roomCode} </h3>
                  <Image src={imageAssets.Copy} alt="copy" className='w-[17px]  ml-2 cursor-pointer ' onClick={handleCopyRoomCode}/>
                </div>
                <h3 className="flex justify-center items-center text-blue text-l font-normal">Kodu Arkadaşlarınla Paylaş</h3>
              </div>
            </div>
            <div className="space-y-4 w-[100%]  flex justify-center">
              <button className="w-full mt-10 w-[300px] justify-center" type="submit" onClick={() => { }}>OYNA</button>
            </div>
          </div>
        </div>
      }
    </div >
  );
}
