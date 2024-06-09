'use client';

import React, { useState } from 'react';
import Header from '../../components/header'
import CountdownTimer from '../../components/countdownTimer'
import CountdownTimerBig from '../../components/countdownTimerBig'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import '../styles/main.css';
import { imageAssets } from '@/utils';
import { topicAssets } from '@/utils';
import { playerImages } from '@/utils';
import PlayersList from '../../components/playerList';
import GuessBox from '../../components/guessBox';
import TopicBox from '../../components/topicBox';
import ChatBox from '../../components/chatBox';
import Roulette from '../../components/roulette';



export default function homePage() {
  const router = useRouter();
  const [showTopic, setShowTopic] = useState(false);
  const [showRoulette, setShowRoulette] = useState(false);
  const [showResearch, setShowResearch] = useState(false);
  const [showWaitForTeller, setShowWaitForTeller] = useState(false);
  const [showTellerChoosing, setTellerChoosing] = useState(false);
  const [showGuess, setShowGuess] = useState(false);
  const [showTell, setShowTell] = useState(true);
  const [endGame, setEndGame] = useState(true);



  const playerInfo = [{ name: "Michael", profilePicture: "Male2" },]

  const gameTopic = [{ topic: "Felsefe" }]


  const handleLeaveClick = () => {
  };

  const handleClosePopupRoom = () => {
    setEndGame(false); // Close the popup
  };

  const handleAddPoint = () => {
  };

  const handleEndGame = () => {
  };

  const players = [
    { name: "Helen", profilePicture: "Female1", score: "35", speaker: 0 },
    { name: "Lila", profilePicture: "Female2", score: "18", speaker: 0 },
    { name: "Joe", profilePicture: "Male1", score: "14", speaker: 0 },
    { name: "Michael", profilePicture: "Male2", score: "10", speaker: 0 },
  ];

  const topics = [
    { src: topicAssets.Sanat, label: 'Sanat' },
    { src: topicAssets.Tarih, label: 'Tarih' },
    { src: topicAssets.Spor, label: 'Spor' },
    { src: topicAssets.Felsefe, label: 'Felsefe' },
    { src: topicAssets.Seyahat, label: 'Seyahat' },
    { src: topicAssets.Sosyoloji, label: 'Sosyoloji' }
  ];
  return (
    <div className="main-page">
      {showTopic && <>
        <Header playerInfo={playerInfo} className="z-20" />
        <div>
          <div className="flex flex-grow w-full mt-4 h-[85vh]">
            <div className="w-1/5">
              <PlayersList players={players} />
            </div>
            <div className="w-3/5 flex flex-col">
              <CountdownTimer initialTime={105} />
              <TopicBox topics={topics} />
            </div>
            <div className="w-1/5 ">
              <ChatBox />
            </div>
          </div>
        </div>
      </>
      }
      {showRoulette && <>
        <Header playerInfo={playerInfo} className="z-20" />
        <div>
          <div className="flex flex-grow w-full mt-4 h-[85vh]">
            <div className="w-1/5">
              <PlayersList players={players} />
            </div>
            <div className="w-3/5 flex flex-col">
              <CountdownTimer initialTime={15} />
              <Roulette gameTopic={gameTopic} />
            </div>
            <div className="w-1/5 ">
              <ChatBox />
            </div>
          </div>
        </div>
      </>
      }
      {showResearch && <>
        <Header playerInfo={playerInfo} className="z-20" />
        <div>
          <div className="flex flex-grow w-full mt-4 h-[85vh]">
            <div className="w-1/5">
              <PlayersList players={players} />
            </div>
            <div className="w-3/5 flex flex-col justify-center items-center">
              <div className="mb-40">
                <h2 className="font-bold m-4 flex justify-center items-center text-dark-blue text-2xl font-medium mb-2">Araştırma Zamanı</h2>
                <CountdownTimerBig initialTime={660} />
              </div>
              <div className="bg-darkest-orange absolute rounded-full flex justify-center items-center bottom-28">
                <h2 className="font-bold flex justify-center items-center text-background-white text-4xl font-medium pl-8 pr-8 p-2">
                  {gameTopic[0].topic}
                </h2>
              </div>
              <div className='flex justify-center items-center absolute cursor-pointer mt-4 bottom-20' onClick={handleLeaveClick}>
                <h1 className="flex justify-center text-darkest-orange text-xl font-medium">Ayrıl</h1>
                <Image src={imageAssets.Leave} alt="Leave" className=' w-[20px] ml-2' />
              </div>
            </div>
            <div className="w-1/5 ">
              <ChatBox />
            </div>
          </div>
        </div>
      </>
      }
      {showWaitForTeller && <>
        <Header playerInfo={playerInfo} className="z-20" />
        <div>
          <div className="flex flex-grow w-full mt-4 h-[85vh]">
            <div className="w-1/5">
              <PlayersList players={players} />
            </div>
            <div className="w-3/5 flex flex-col justify-center items-center">
              <div className="mt-20 mb-5 flex flex-col justify-center items-center">
                <CountdownTimerBig initialTime={30} />
                <h2 className="w-[70%]  font-bold m-4 flex justify-center items-center text-center text-blue text-2xl font-medium mb-2">Arkadaşın Ne Anlatacağına Karar Veriyor...</h2>

              </div>
              <GuessBox playerInfo={playerInfo} />
            </div>
            <div className="w-1/5 ">
              <ChatBox />
            </div>
          </div>
        </div>
      </>
      }
      {showTellerChoosing && <>
        <Header playerInfo={playerInfo} className="z-[20]" />
        <div>
          <div className="flex flex-grow w-full mt-4 h-[85vh]">
            <div className="w-1/5">
              <PlayersList players={players} />
            </div>
            <div className="w-3/5 flex flex-col">
              <CountdownTimer initialTime={30} />
              <div className="mt-10 mb-5 flex flex-col justify-center items-center  ">
                <Image src={imageAssets.Microphone} alt="Microphone" className='w-8 z-[5]' />
                <h2 className="w-[70%]  font-bold m-4 flex justify-center items-center text-center text-blue text-2xl font-medium mb-2 z-[5]">Arkdadaşlarına Ne Anlatacaksın?</h2>
                <div className="bg-darkest-blue rounded-full flex justify-center items-center p-3 z-[5]">
                  <input
                    className="w-[95%] ml-1 bg-darkest-blue text-white text-2xl font-medium border-none focus:outline-none focus:ring-0"
                    type="text"
                    placeholder="_ _ _ _ _ _   _ _ _ _    _ _ _ _ _ _"
                  />

                </div>
                <div className="absolute inset-0 bg-background-white bg-opacity-55 z-[4]"></div>
              </div>
              <GuessBox playerInfo={playerInfo} />
            </div>
            <div className="w-1/5 ">
              <ChatBox />
            </div>
          </div>
        </div>
      </>
      }
      {showGuess && <>
        <Header playerInfo={playerInfo} className="z-20" />
        <div>
          <div className="flex flex-grow w-full mt-4 h-[85vh]">
            <div className="w-1/5">
              <PlayersList players={players} />
            </div>
            <div className="w-3/5 flex flex-col">
              <CountdownTimer initialTime={150} />
              <GuessBox playerInfo={playerInfo} />
            </div>
            <div className="w-1/5 ">
              <ChatBox />
            </div>
          </div>
        </div>
      </>
      }
      {showTell && <>
        <Header playerInfo={playerInfo} className="z-20" />
        <div>
          <div className="flex flex-grow w-full mt-4 h-[85vh]">
            <div className="w-1/5">
              <PlayersList players={players} />
            </div>
            <div className="w-3/5 flex flex-col">
              <CountdownTimer initialTime={150} />
              <div className="mt-10 mb-5 flex flex-col justify-center items-center  ">
                <div className="bg-darkest-blue rounded-full flex justify-center items-center p-3 z-[5]">
                  <h2 className="font-bold flex justify-center items-center text-center text-background-white text-2xl font-medium pl-4 pr-4 z-[5]">Hassan Sabbah</h2>
                </div>
                <Image src={imageAssets.Microphone} alt="Microphone" className='w-14 mt-4 z-[5]' />
              </div>
              <GuessBox playerInfo={playerInfo} />
            </div>
            <div className="w-1/5 ">
              <ChatBox />
            </div>
          </div>
        </div>
      </>
      }
      {endGame &&
        <div className='fixed inset-0 flex justify-center items-center z-[6]'>
          <div className="fixed inset-0 bg-background-white bg-opacity-55 flex justify-center items-center" onClick={handleClosePopupRoom}></div>
          <div className="bg-white fixed flex p-8 rounded-[90px] shadow-lg w-[900px] h-[550px] absolute  justify-between flex-col">
            <div className="space-y-4 w-[100%] relative">
              <h3 className="flex justify-center items-center text-blue text-xl font-medium mb-2">Tebrikler! Oyun Bitti</h3>
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
                    <div className="w-full relative">
                      <span className="text-blue text-lg">{player.name}</span>
                      <span className="text-blue text-l absolute font-medium right-[30%]">{player.score} p</span>
                      <div className='absolute right-[20%] top-[10%] bg-orange/50 w-6 h-6 rounded-full cursor-pointer' onClick={handleAddPoint}>                      
                        <span className="text-blue text-l absolute font-medium right-[24%] ">+</span>
                      </div>

                    </div>
                    {index === 0 &&
                      <Image
                        src={imageAssets.Winner}
                        alt={"Winner"}
                        className="w-9 rounded-full ml-2 mb-12 absolute"
                      />}
                  </div>
                ))}
              </div>
              <div className="flex flex-col w-[100%] justify-center items-center">
              </div>
            </div>
            <div className="space-y-4 w-[100%]  flex  justify-center">
              <button className="mt-10 w-[300px] justify-center" type="submit" onClick={() => { handleEndGame(); }}>OYLA VE BİTİR</button>
            </div>
          </div>
        </div>
      }

    </div >
  );
}