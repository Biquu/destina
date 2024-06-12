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
import TopicBox from "@/components/topicBox";
import { GlobalContext } from "@/context";
import { socket } from "@/socket";
import { fetchGameByCode } from "@/services/game";

const gamePage = ({ params }) => {
  const router = useRouter();
  const { code } = params;
  const [game, setGame] = useState(null);
  const [showTopic, setShowTopic] = useState(true);
  const [showRoulette, setShowRoulette] = useState(false);
  const [showResearch, setShowResearch] = useState(false);
  const [showWaitForTeller, setShowWaitForTeller] = useState(false);
  const [showTellerChoosing, setShowTellerChoosing] = useState(false);
  const [showGuess, setShowGuess] = useState(false);
  const [showTell, setShowTell] = useState(false);

  const [messages, setMessages] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const [finalTopic, setFinalTopic] = useState(null);
  const [roles, setRoles] = useState({});
  const [participants, setParticipants] = useState([]);
  const [userRole, setUserRole] = useState("");

  const { user } = useContext(GlobalContext);

  useEffect(() => {
    const fetchGame = async () => {
      const gameData = await fetchGameByCode(code);
      setGame(gameData);
      setParticipants(gameData.participants);
    };
    fetchGame();
  }, [code]);

  // Load messages from session storage
  useEffect(() => {
    const storedMessages = localStorage.getItem(`messages_${code}`);
    const storedGuesses = localStorage.getItem(`guesses_${code}`);
    if (storedMessages) setMessages(JSON.parse(storedMessages));
    if (storedGuesses) setGuesses(JSON.parse(storedGuesses));
  }, [code]);

  useEffect(() => {
    if (code) {
      socket.emit("joinRoom", code, user);

      socket.on("chatMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on("guessMessage", (guess) => {
        setGuesses((prevGuesses) => [...prevGuesses, guess]);
      });

      socket.on("participants", (participants) => {
        setParticipants(participants);
      });

      socket.on("assignRoles", (roles) => {
        setRoles(roles);
        const role = roles[user.username];
        setUserRole(role);
        console.log("Assigned roles:", roles);
        console.log("User role:", role);
      });

      return () => {
        socket.emit("leaveRoom", code, user);
        socket.off("chatMessage");
        socket.off("guessMessage");
        socket.off("participants");
        socket.off("assignRoles");
      };
    }
  }, [code, user]);

  useEffect(() => {
    if (allTopics.length > 0) {
      const flattenedTopics = allTopics.flat();
      const randomIndex = Math.floor(Math.random() * flattenedTopics.length);
      const randomTopic = flattenedTopics[randomIndex];
      setFinalTopic(randomTopic);
    }
  }, [allTopics]);

  const handleSendMessage = (message) => {
    socket.emit("chatMessage", code, { user: user.username, message });
    setMessages((prevMessages) => {
      const updatedMessages = [
        ...prevMessages,
        { user: user.username, message },
      ];
      localStorage.setItem(`messages_${code}`, JSON.stringify(updatedMessages));
      return updatedMessages;
    });
  };

  const handleSendGuess = (guess) => {
    socket.emit("guessMessage", code, { user: user.username, message: guess });
    setGuesses((prevGuesses) => {
      const updatedGuesses = [
        ...prevGuesses,
        { user: user.username, message: guess },
      ];
      localStorage.setItem(`guesses_${code}`, JSON.stringify(updatedGuesses));
      return updatedGuesses;
    });
  };

  const handleTopicSelection = (label) => {
    setSelectedTopics((prevSelected) => {
      const updatedTopics = prevSelected.includes(label)
        ? prevSelected.filter((topic) => topic !== label)
        : prevSelected.length < 3
        ? [...prevSelected, label]
        : [...prevSelected.slice(1), label];
      return updatedTopics;
    });
  };

  const handleFinalTopicSelection = () => {
    setAllTopics((prevTopics) => [...prevTopics, selectedTopics]);
    setShowTopic(false);
    setShowRoulette(true);
  };

  const handleCompleteRoulette = () => {
    console.log("Roulette completed");
    setShowRoulette(false);
    setShowResearch(true);
  };

  const handleCompleteResearch = () => {
    console.log("Research completed");
    socket.emit("assignRoles", code);

    const role = roles[user.username];
    console.log("User role:", role);
    if (role === "narrator") {
      setShowTellerChoosing(true);
    } else {
      setShowWaitForTeller(true);
    }
    setShowResearch(false);
  };

  const handleCompleteWaitForTeller = () => {
    console.log("Wait for teller completed");
    setShowWaitForTeller(false);
    setShowTellerChoosing(true);
  };

  const handleCompleteTellerChoosing = () => {
    console.log("Teller choosing completed");
    setShowTellerChoosing(false);
    setShowGuess(true);
  };

  const handleCompleteGuess = () => {
    console.log("Guessing completed");
    setShowGuess(false);
    setShowTell(true);
  };

  const handleCompleteTell = () => {
    console.log("Telling completed");
    setShowTell(false);
    // Move to the next round or show final scores
  };

  const playerInfo = [{ name: user?.username, profilePicture: "Male2" }];
  const handleLeaveClick = () => {};

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
                <PlayersList players={participants} />
              </div>
              <div className="w-3/5 flex flex-col">
                <CountdownTimer
                  initialTime={6}
                  onComplete={handleFinalTopicSelection}
                />
                <TopicBox
                  topics={topics}
                  onSelectTopic={handleTopicSelection}
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
      {showRoulette && (
        <>
          <Header playerInfo={playerInfo} className="z-20" />
          <div>
            <div className="flex flex-grow w-full mt-4 h-[85vh]">
              <div className="w-1/5">
                <PlayersList players={participants} />
              </div>
              <div className="w-3/5 flex flex-col">
                <CountdownTimer
                  initialTime={10}
                  onComplete={handleCompleteRoulette}
                />
                <Roulette allTopics={allTopics} finalTopic={finalTopic} />
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
                <PlayersList players={participants} />
              </div>
              <div className="w-3/5 flex flex-col justify-center items-center">
                <div className="mb-40">
                  <h2 className="font-bold m-4 flex justify-center items-center text-dark-blue text-2xl font-medium mb-2">
                    Araştırma Zamanı
                  </h2>
                  <CountdownTimerBig
                    initialTime={10}
                    onComplete={handleCompleteResearch}
                  />
                </div>
                <div className="bg-darkest-orange absolute rounded-full flex justify-center items-center bottom-28">
                  <h2 className="font-bold flex justify-center items-center text-background-white text-4xl font-medium pl-8 pr-8 p-2">
                    {finalTopic}
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
      {userRole !== "narrator" && showWaitForTeller && (
        <>
          <Header playerInfo={playerInfo} className="z-20" />
          <div>
            <div className="flex flex-grow w-full mt-4 h-[85vh]">
              <div className="w-1/5">
                <PlayersList players={participants} />
              </div>
              <div className="w-3/5 flex flex-col justify-center items-center">
                <div className="mt-20 mb-5 flex flex-col justify-center items-center">
                  <CountdownTimerBig
                    initialTime={10}
                    onComplete={handleCompleteWaitForTeller}
                  />
                  <h2 className="w-[70%]  font-bold m-4 flex justify-center items-center text-center text-blue text-2xl font-medium mb-2">
                    Arkadaşın Ne Anlatacağına Karar Veriyor...
                  </h2>
                </div>
                <GuessBox
                  playerInfo={playerInfo}
                  onSendGuess={handleSendGuess}
                  guesses={guesses}
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
                <PlayersList players={participants} />
              </div>
              <div className="w-3/5 flex flex-col">
                <CountdownTimer
                  initialTime={10}
                  onComplete={handleCompleteTellerChoosing}
                />
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
                  onSendGuess={handleSendGuess}
                  guesses={guesses}
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
      {userRole !== "narrator" && showGuess && (
        <>
          <Header playerInfo={playerInfo} className="z-20" />
          <div>
            <div className="flex flex-grow w-full mt-4 h-[85vh]">
              <div className="w-1/5">
                <PlayersList players={participants} />
              </div>
              <div className="w-3/5 flex flex-col">
                <CountdownTimer
                  initialTime={10}
                  onComplete={handleCompleteGuess}
                />
                <GuessBox
                  playerInfo={playerInfo}
                  onSendGuess={handleSendGuess}
                  guesses={guesses}
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
                <PlayersList players={participants} />
              </div>
              <div className="w-3/5 flex flex-col">
                <CountdownTimer
                  initialTime={10}
                  onComplete={handleCompleteTell}
                />
                <GuessBox
                  playerInfo={playerInfo}
                  onSendGuess={handleSendGuess}
                  guesses={guesses}
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
