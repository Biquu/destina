"use client";

import React, { useState, useContext, useEffect } from "react";
import Header from "@/components/header";
import CountdownTimer from "@/components/countdownTimer";
import CountdownTimerBig from "@/components/countdownTimerBig";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../../styles/main.css";
import { imageAssets } from "@/utils";
import { topicAssets } from "@/utils";
import PlayersList from "@/components/playerList";
import GuessBox from "@/components/guessBox";
import ChatBox from "@/components/chatBox";
import Roulette from "@/components/roulette";
import { GlobalContext } from "@/context";
import { socket } from "@/socket";

const gamePage = ({ params }) => {
  const router = useRouter();
  const { code } = params;
  const [game, setGame] = useState(null);
  const [showTopic, setShowTopic] = useState(false);
  const [showRoulette, setShowRoulette] = useState(false);
  const [showResearch, setShowResearch] = useState(false);
  const [showWaitForTeller, setShowWaitForTeller] = useState(false);
  const [showTellerChoosing, setTellerChoosing] = useState(false);
  const [showGuess, setShowGuess] = useState(true);
  const [showTell, setShowTell] = useState(false);
  const [messages, setMessages] = useState([]);
  const { user, participants, setParticipants } = useContext(GlobalContext);

  useEffect(() => {
    if (code) {
      fetch(`/api/game/${code}`)
        .then((res) => res.json())
        .then((data) => {
          setGame(data);
        })
        .catch((err) => {
          console.error(err);
        });

      socket.emit("joinRoom", code);

      socket.on("chatMessage", (message) => {
        console.log("Message received:", message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.emit("leaveRoom", code);
        socket.off("chatMessage");
      };
    }
  }, [code]);

  const handleSendMessage = (message) => {
    console.log("Message sent:", message);
    socket.emit("chatMessage", code, {user: user.username, message});
  };
    

  const playerInfo = [{ name: user?.username, profilePicture: "Male2" }];
  const gameTopic = [{ topic: "Felsefe" }];
  const handleLeaveClick = () => {};

  const players = [
    { name: "Helen", profilePicture: "Female1", score: "35", speaker: 0 },
    { name: "Lila", profilePicture: "Female2", score: "18", speaker: 0 },
    { name: "Joe", profilePicture: "Male1", score: "14", speaker: 0 },
    { name: "Michael", profilePicture: "Male2", score: "10", speaker: 0 },
  ];

  const topics = [
    { src: topicAssets.Sanat, label: "Sanat" },
    { src: topicAssets.Tarih, label: "Tarih" },
    { src: topicAssets.Spor, label: "Spor" },
    { src: topicAssets.Felsefe, label: "Felsefe" },
    { src: topicAssets.Seyahat, label: "Seyahat" },
    { src: topicAssets.Sosyoloji, label: "Sosyoloji" },
  ];

  return (
    <div className="main-page">
      {showTopic && (
        <>
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
                <ChatBox
                  onSendMessage={handleSendMessage}
                  messages={messages}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {showRoulette && (
        <>
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
                <ChatBox
                  onSendMessage={handleSendMessage}
                  messages={messages}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {showResearch && (
        <>
          <Header playerInfo={playerInfo} className="z-20" />
          <div>
            <div className="flex flex-grow w-full mt-4 h-[85vh]">
              <div className="w-1/5">
                <PlayersList players={players} />
              </div>
              <div className="w-3/5 flex flex-col justify-center items-center">
                <div className="mb-40">
                  <h2 className="font-bold m-4 flex justify-center items-center text-dark-blue text-2xl font-medium mb-2">
                    Araştırma Zamanı
                  </h2>
                  <CountdownTimerBig initialTime={660} />
                </div>
                <div className="bg-darkest-orange absolute rounded-full flex justify-center items-center bottom-28">
                  <h2 className="font-bold flex justify-center items-center text-background-white text-4xl font-medium pl-8 pr-8 p-2">
                    {gameTopic[0].topic}
                  </h2>
                </div>
                <div
                  className="flex justify-center items-center absolute cursor-pointer mt-4 bottom-20"
                  onClick={handleLeaveClick}
                >
                  <h1 className="flex justify-center text-darkest-orange text-xl font-medium">
                    Ayrıl
                  </h1>
                  <Image
                    src={imageAssets.Leave}
                    alt="Leave"
                    className=" w-[20px] ml-2"
                  />
                </div>
              </div>
              <div className="w-1/5 ">
                <ChatBox
                  onSendMessage={handleSendMessage}
                  messages={messages}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {showWaitForTeller && (
        <>
          <Header playerInfo={playerInfo} className="z-20" />
          <div>
            <div className="flex flex-grow w-full mt-4 h-[85vh]">
              <div className="w-1/5">
                <PlayersList players={players} />
              </div>
              <div className="w-3/5 flex flex-col justify-center items-center">
                <div className="mt-20 mb-5 flex flex-col justify-center items-center">
                  <CountdownTimerBig initialTime={30} />
                  <h2 className="w-[70%]  font-bold m-4 flex justify-center items-center text-center text-blue text-2xl font-medium mb-2">
                    Arkadaşın Ne Anlatacağına Karar Veriyor...
                  </h2>
                </div>
                <GuessBox
                  playerInfo={playerInfo}
                  onSendMessage={handleSendMessage}
                />
              </div>
              <div className="w-1/5 ">
                <ChatBox
                  onSendMessage={handleSendMessage}
                  messages={messages}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {showTellerChoosing && (
        <>
          <Header playerInfo={playerInfo} className="z-[20]" />
          <div>
            <div className="flex flex-grow w-full mt-4 h-[85vh]">
              <div className="w-1/5">
                <PlayersList players={players} />
              </div>
              <div className="w-3/5 flex flex-col">
                <CountdownTimer initialTime={30} />
                <div className="mt-10 mb-5 flex flex-col justify-center items-center  ">
                  <Image
                    src={imageAssets.Microphone}
                    alt="Microphone"
                    className="w-8 z-[5]"
                  />
                  <h2 className="w-[70%]  font-bold m-4 flex justify-center items-center text-center text-blue text-2xl font-medium mb-2 z-[5]">
                    Arkdadaşlarına Ne Anlatacaksın?
                  </h2>
                  <div className="bg-darkest-blue rounded-full flex justify-center items-center p-3 z-[5]">
                    <input
                      className="w-[95%] ml-1 bg-darkest-blue text-white text-2xl font-medium border-none focus:outline-none focus:ring-0"
                      type="text"
                      placeholder="_ _ _ _ _ _   _ _ _ _    _ _ _ _ _ _"
                    />
                  </div>
                  <div className="absolute inset-0 bg-background-white bg-opacity-55 z-[4]"></div>
                </div>
                <GuessBox
                  playerInfo={playerInfo}
                  onSendMessage={handleSendMessage}
                />
              </div>
              <div className="w-1/5 ">
                <ChatBox
                  onSendMessage={handleSendMessage}
                  messages={messages}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {showGuess && (
        <>
          <Header playerInfo={playerInfo} className="z-20" />
          <div>
            <div className="flex flex-grow w-full mt-4 h-[85vh]">
              <div className="w-1/5">
                <PlayersList players={players} />
              </div>
              <div className="w-3/5 flex flex-col">
                <CountdownTimer initialTime={105} />
                <GuessBox
                  playerInfo={playerInfo}
                  onSendMessage={handleSendMessage}
                />
              </div>
              <div className="w-1/5 ">
                <ChatBox
                  onSendMessage={handleSendMessage}
                  messages={messages}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {showTell && (
        <>
          <Header playerInfo={playerInfo} className="z-20" />
          <div>
            <div className="flex flex-grow w-full mt-4 h-[85vh]">
              <div className="w-1/5">
                <PlayersList players={players} />
              </div>
              <div className="w-3/5 flex flex-col">
                <CountdownTimer initialTime={105} />
                <GuessBox
                  playerInfo={playerInfo}
                  onSendMessage={handleSendMessage}
                />
              </div>
              <div className="w-1/5 ">
                <ChatBox
                  onSendMessage={handleSendMessage}
                  messages={messages}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default gamePage;
