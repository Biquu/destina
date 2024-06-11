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

const gamePage = ({ params }) => {
  const router = useRouter();
  const { code } = params;
  const [game, setGame] = useState(null);
  const [showTopic, setShowTopic] = useState(true);
  const [showRoulette, setShowRoulette] = useState(false);
  const [showResearch, setShowResearch] = useState(false);
  const [showWaitForTeller, setShowWaitForTeller] = useState(false);
  const [showTellerChoosing, setTellerChoosing] = useState(false);
  const [showGuess, setShowGuess] = useState(false);
  const [showTell, setShowTell] = useState(false);

  const [messages, setMessages] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const [finalTopic, setFinalTopic] = useState(null);

  const { user, participants, setParticipants } = useContext(GlobalContext);

  // Load messages from session storage
  useEffect(() => {
    const storedMessages = localStorage.getItem(`messages_${code}`);
    const storedGuesses = localStorage.getItem(`guesses_${code}`);
    if (storedMessages) setMessages(JSON.parse(storedMessages));
    if (storedGuesses) setGuesses(JSON.parse(storedGuesses));
  }, [code]);

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

      socket.on("guessMessage", (guess) => {
        console.log("Guess received:", guess);
        setGuesses((prevGuesses) => [...prevGuesses, guess]);
      });

      return () => {
        socket.emit("leaveRoom", code);
        socket.off("chatMessage");
        socket.off("guessMessage");
      };
    }
  }, [code]);

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
    console.log("Message sent:", message);
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
    console.log("Guess sent:", guess);
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

      console.log("Updated selected topics:", updatedTopics);
      return updatedTopics;
    });
  };

  const handleFinalTopicSelection = () => {
    setAllTopics((prevTopics) => {
      const updatedTopics = [...prevTopics, selectedTopics];
      console.log("All topics after selection:", updatedTopics);
      return updatedTopics;
    });
    setShowTopic(false);
    setShowRoulette(true);
  };

  const playerInfo = [{ name: user?.username, profilePicture: "Male2" }];
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
                <CountdownTimer
                  initialTime={30}
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
                <PlayersList players={players} />
              </div>
              <div className="w-3/5 flex flex-col">
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
                <PlayersList players={players} />
              </div>
              <div className="w-3/5 flex flex-col">
                <CountdownTimer initialTime={105} />
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