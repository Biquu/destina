"use client";

import React, { useState, useContext, useEffect } from "react";
import Header from "@/components/header";
import CountdownTimer from "@/components/countdownTimer";
import CountdownTimerBig from "@/components/countdownTimerBig";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../../styles/main.css";
import { imageAssets } from "@/utils";
import { playerImages } from "@/utils";

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
  const [endGame, setEndGame] = useState(false);

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
      console.log("Flattened topics:", flattenedTopics);
      const randomIndex = Math.floor(Math.random() * flattenedTopics.length);
      const randomTopic = flattenedTopics[randomIndex];

      const randomTopicIndex = Math.floor(Math.random() * randomTopic.length);
      const topic = randomTopic[randomTopicIndex];
      console.log("Random topic selected:", topic);
      setFinalTopic(topic);
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

    setEndGame(true);
  };

  const handleCompleteTell = () => {
    console.log("Telling completed");

    setEndGame(true);
    // Move to the next round or show final scores
  };

  const handleClosePopupRoom = () => {
    setEndGame(false); // Close the popup
  };
  const handleAddPoint = () => {};

  const handleEndGame = () => {
    router.push("/home");
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
                  initialTime={11}
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
                  initialTime={15}
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
                    Arkadaşlarına Ne Anlatacaksın?
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
      {endGame && (
        <div className="fixed inset-0 flex justify-center items-center z-[6]">
          <div
            className="fixed inset-0 bg-background-white bg-opacity-55 flex justify-center items-center"
            onClick={handleClosePopupRoom}
          ></div>
          <div className="bg-white fixed flex p-8 rounded-[90px] shadow-lg w-[900px] h-[550px] absolute  justify-between flex-col">
            <div className="space-y-4 w-[100%] relative">
              <h3 className="flex justify-center items-center text-blue text-xl font-medium mb-2">
                Tebrikler! Oyun Bitti
              </h3>
              <div
                className="flex justify-center items-center cursor-pointer absolute right-4 top-[-16px]"
                onClick={handleLeaveClick}
              >
                <h1 className="flex justify-center text-darkest-orange text-xl font-medium mb-2">
                  Ayrıl
                </h1>
                <Image
                  src={imageAssets.Leave}
                  alt="Leave"
                  className=" w-[20px] pb-2 ml-2"
                />
              </div>
            </div>
            <div className="flex flex-row space-y-4 w-[100%] h-[80%]">
              <div className="flex flex-col space-y-4 w-[100%]">
                <h3 className="flex justify-center items-center text-blue text-xl font-medium mb-2">
                  Oyuncular
                </h3>
                {participants.map((player, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Image
                      src={
                        playerImages[player?.profileImage]?.src ||
                        playerImages["Male5"]?.src
                      }
                      width={40}
                      height={40}
                      alt={player?.name || "Unknown"}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <div className="w-full relative">
                      <span className="text-blue text-lg">
                        {player?.name || "Unknown"}
                      </span>
                      <span className="text-blue text-l absolute font-medium right-[30%]">
                        {player?.score || "0"} p
                      </span>
                      <div
                        className="absolute right-[20%] top-[10%] bg-orange/50 w-6 h-6 rounded-full cursor-pointer"
                        onClick={handleAddPoint}
                      >
                        <span className="text-blue text-l absolute font-medium right-[24%] ">
                          +
                        </span>
                      </div>
                    </div>
                    {index === 0 && (
                      <Image
                        src={imageAssets.Winner}
                        alt={"Winner"}
                        className="w-9 rounded-full ml-2 mb-12 absolute"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-col w-[100%] justify-center items-center"></div>
            </div>
            <div className="space-y-4 w-[100%]  flex  justify-center">
              <button
                className="mt-10 w-[300px] justify-center"
                type="submit"
                onClick={() => {
                  handleEndGame();
                }}
              >
                OYLA VE BİTİR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default gamePage;
