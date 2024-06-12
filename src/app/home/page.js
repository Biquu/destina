"use client";

import React, { useState, useContext, useEffect } from "react";
import Header from "../../components/header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../styles/main.css";
import { imageAssets } from "@/utils";
import { playerImages } from "@/utils";
import { GlobalContext } from "@/context";
import { createGame, joinGame } from "@/services/game";
import { nanoid } from "nanoid";
import io from "socket.io-client";

const socket = io();

export default function homePage() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupRoom, setShowPopupRoom] = useState(false);
  const [showGames, setShowGames] = useState(false);
  const [selectedGame, setSelectedGame] = useState(1);
  const [gameCode, setGameCode] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [isCreator, setIsCreator] = useState(false);

  const { user, participants, setParticipants } = useContext(GlobalContext);

  const playerInfo = [{ name: user?.username, profilePicture: "Male2" }];

  useEffect(() => {
    socket.on("participants", (updatedParticipants) => {
      setParticipants(updatedParticipants);
      console.log("Participants updated: ", updatedParticipants);
    });

    socket.on("startGame", (participants) => {
      assignRoles(participants);
    });

    socket.on("assignRoles", (assignedRoles) => {
      setRoles(assignedRoles);
      startGameFlow(assignedRoles);
    });

    return () => {
      socket.off("participants");
      socket.off("startGame");
      socket.off("assignRoles");
    };
  }, []);
  

  const handlePlayRandom = () => {
    setShowGames(true);
  };

  const handleCloseGames = () => {
    setShowGames(false);
  };

  const handlePlayWithFriends = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleJoinRoom = () => {
    setShowPopupRoom(true);
  };

  const handleClosePopupRoom = () => {
    setShowPopupRoom(false);
  };

  const handleLeaveClick = () => {
    setShowPopupRoom(false);
  };

  const handleCreateGame = () => {
    router.push(`/game/${gameCode}`);
  };

  const handleCopyRoomCode = () => {
    navigator.clipboard
      .writeText(gameCode)
      .then(() => {
        console.log("Room code copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleJoinFriend = async () => {
    let joinData = {
      userId: user?._id,
      username: user?.username,
      code: roomCode,
    };

    try {
      const data = await joinGame(joinData);
      if (data.success) {
        setParticipants(data.game.participants);
        setGameCode(roomCode); // Set gameCode when joining a new room
        socket.emit("joinRoom", roomCode, user);
        handleJoinRoom();
      } else {
        console.log("Failed to join game");
      }
    } catch (error) {
      console.error("Failed to join game: ", error);
    }
  };

  const handleCreateRoom = async () => {
    let gameData = {
      userId: user?._id,
      username: user?.username,
      code: nanoid(6),
    };
    switch (selectedGame) {
      case 1:
        gameData = { ...gameData, duration: 600, capacity: 3 };
        break;
      case 2:
        gameData = { ...gameData, duration: 1200, capacity: 4 };
        break;
      case 3:
        gameData = { ...gameData, duration: 1500, capacity: 4 };
        break;
      case 4:
        gameData = { ...gameData, duration: 2100, capacity: 5 };
        break;
      default:
        break;
    }
    setGameCode(gameData.code);

    try {
      const data = await createGame(gameData);
      if (data.success) {
        setIsCreator(true);
        setParticipants(data.data.participants);
        socket.emit("joinRoom", gameData.code, user);
        handleClosePopup();
      } else {
        console.log("Failed to create game");
      }
    } catch (error) {
      console.error("Failed to create game: ", error);
    }
  };

  return (
    <div className="main-page">
      <Header playerInfo={playerInfo} />
      <div className="flex flex-col justify-center min-h-[90vh]">
        <div className="flex justify-center mb-[6%] ml-[12%] mr-[12%]">
          <div className="mr-14 flex justify-center min-w-[200px]">
            <Image
              src={imageAssets.Lion}
              alt="Lion"
              className="min-w-[200px]"
            />
          </div>
          <div className="buttons w-[300px]">
            {!showGames && (
              <button type="submit" onClick={handlePlayRandom}>
                ODA BUL
              </button>
            )}
            {showGames && (
              <div>
                <div
                  className="fixed inset-0 bg-background-white bg-opacity-55 flex justify-center items-center"
                  onClick={handleCloseGames}
                ></div>
                <div className="fixed relative">
                  <button type="submit" onClick={handlePlayRandom}>
                    DEVAM ET
                  </button>
                </div>
              </div>
            )}
            {showGames && (
              <div className="fixed flex justify-center items-center">
                <div className="fixed relative top-[30px] right-[30px]">
                  <div
                    className={`bg-orange flex justify-center items-center rounded-full w-[75px] h-[75px] absolute bottom-[200px] right-[155px] shadow-lg hover:shadow-orange/50 ${
                      selectedGame === 1
                        ? "opacity-100 shadow-orange"
                        : "opacity-30"
                    }`}
                    onClick={() => setSelectedGame(1)}
                  >
                    <h1 className="flex justify-center text-background-white text-xl font-normal pl-3 tracking-tight leading-none">
                      3 Kişi 10 dk.
                    </h1>
                  </div>
                  <div
                    className={`bg-dark-orange flex justify-center items-center rounded-full w-[75px] h-[75px] absolute bottom-[240px] right-[0px] shadow-lg hover:shadow-orange/50 ${
                      selectedGame === 2
                        ? "opacity-100 shadow-orange"
                        : "opacity-30"
                    }`}
                    onClick={() => setSelectedGame(2)}
                  >
                    <h1 className="flex justify-center text-background-white text-xl font-normal pl-3 tracking-tight leading-none">
                      4 Kişi 20 dk.
                    </h1>
                  </div>
                  <div
                    className={`bg-dark-orange flex justify-center items-center rounded-full w-[75px] h-[75px] absolute bottom-[240px] left-[60px] shadow-lg hover:shadow-orange/50 ${
                      selectedGame === 3
                        ? "opacity-100 shadow-orange"
                        : "opacity-30"
                    }`}
                    onClick={() => setSelectedGame(3)}
                  >
                    <h1 className="flex justify-center text-background-white text-xl font-normal pl-3 tracking-tight leading-none">
                      4 Kişi 25 dk.
                    </h1>
                  </div>
                  <div
                    className={`bg-darkest-orange flex justify-center items-center rounded-full w-[75px] h-[75px] absolute bottom-[200px] left-[205px] shadow-lg hover:shadow-orange/50 ${
                      selectedGame === 4
                        ? "opacity-100 shadow-orange"
                        : "opacity-30"
                    }`}
                    onClick={() => setSelectedGame(4)}
                  >
                    <h1 className="flex justify-center text-background-white text-xl font-normal pl-3 tracking-tight leading-none">
                      5 Kişi 35 dk.
                    </h1>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-row justify-center w-full">
              <hr className="mt-3 border-blue w-[135px]" />
              <span className="ml-3 mr-3 text-blue">VEYA</span>
              <hr className="mt-3 border-blue w-[135px]" />
            </div>
            <button type="button" onClick={handlePlayWithFriends}>
              ARKADAŞLARINLA OYNA
            </button>
            <p className="w-full max-w-96 text-sm text-blue text-center">
              Oda bul seçeneğini seçerek, sizin için en uygun insanlarla
              eşleşebilirsiniz. Daha doğru sonuçlar için lütfen oturumlarımızı
              oylamayı unutmayınız.
            </p>
          </div>
          <div className="ml-14 flex justify-center min-w-[200px]">
            <Image
              src={imageAssets.Coyote}
              alt="Coyote"
              className="min-w-[200px]"
            />
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div
            className="fixed inset-0 bg-background-white bg-opacity-55 flex justify-center items-center"
            onClick={handleClosePopup}
          ></div>
          <div className="bg-white fixed flex p-8 rounded-[90px] shadow-lg w-[900px] h-[550px] absolute justify-between flex-row">
            <div className="flex flex-col space-y-4 w-[45%]">
              <h3 className="flex justify-center text-blue text-xl font-medium mb-2">
                Odaya Katıl
              </h3>
              <input
                type={"text"}
                placeholder={"Oda Kodu"}
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                required
                className="mt-1 bg-[#E8EFEC] block w-full border border-dark-blue p-2 rounded-[15px] text-blue placeholder:font-medium placeholder:text-blue px-5"
              />
              <button
                className="w-full"
                type="submit"
                onClick={() => {
                  handleJoinRoom();
                  handleClosePopup();
                  handleJoinFriend();
                }}
              >
                KATIL
              </button>
            </div>
            <div className="border border-dark-blue h-[450px] w-0"></div>
            <div className="flex flex-col space-y-4 w-[45%]">
              <h3 className="flex justify-center text-blue text-xl font-medium mb-2">
                Oda Oluştur
              </h3>
              <div className="fixed relative flex fle-col mb-10">
                <div
                  className={`bg-orange flex justify-center items-center rounded-full w-[75px] h-[75px] shadow-lg hover:shadow-orange/50 ${
                    selectedGame === 1
                      ? "opacity-100 shadow-orange"
                      : "opacity-30"
                  }`}
                  onClick={() => setSelectedGame(1)}
                >
                  <h1 className="flex justify-center text-background-white text-xl font-normal pl-3 tracking-tight leading-none">
                    3 Kişi 10 dk.
                  </h1>
                </div>
                <div
                  className={`bg-dark-orange flex justify-center items-center rounded-full w-[75px] h-[75px] shadow-lg hover:shadow-orange/50 mt-10 ${
                    selectedGame === 2
                      ? "opacity-100 shadow-orange"
                      : "opacity-30"
                  }`}
                  onClick={() => setSelectedGame(2)}
                >
                  <h1 className="flex justify-center text-background-white text-xl font-normal pl-3 tracking-tight leading-none">
                    4 Kişi 20 dk.
                  </h1>
                </div>
                <div
                  className={`bg-dark-orange flex justify-center items-center rounded-full w-[75px] h-[75px] shadow-lg hover:shadow-orange/50 ${
                    selectedGame === 3
                      ? "opacity-100 shadow-orange"
                      : "opacity-30"
                  }`}
                  onClick={() => setSelectedGame(3)}
                >
                  <h1 className="flex justify-center text-background-white text-xl font-normal pl-3 tracking-tight leading-none">
                    4 Kişi 25 dk.
                  </h1>
                </div>
                <div
                  className={`bg-darkest-orange flex justify-center items-center rounded-full w-[75px] h-[75px] shadow-lg hover:shadow-orange/50 mt-10 ${
                    selectedGame === 4
                      ? "opacity-100 shadow-orange"
                      : "opacity-30"
                  }`}
                  onClick={() => setSelectedGame(4)}
                >
                  <h1 className="flex justify-center text-background-white text-xl font-normal pl-3 tracking-tight leading-none">
                    5 Kişi 35 dk.
                  </h1>
                </div>
              </div>
              <button
                className="w-full mt-10"
                type="submit"
                onClick={() => {
                  handleJoinRoom();
                  handleClosePopup();
                  handleCreateRoom();
                }}
              >
                ODA OLUŞTUR
              </button>
            </div>
          </div>
        </div>
      )}
      {showPopupRoom && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div
            className="fixed inset-0 bg-background-white bg-opacity-55 flex justify-center items-center"
            onClick={handleClosePopupRoom}
          ></div>
          <div className="bg-white fixed flex p-8 rounded-[90px] shadow-lg w-[900px] h-[550px] absolute justify-between flex-col">
            <div className="space-y-4 w-[100%] relative">
              <h3 className="flex justify-center items-center text-blue text-xl font-medium mb-2">
                Arkadaşlarınla Oyna
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
                  className="w-[20px] pb-2 ml-2"
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
                      src={playerImages["Male1"]}
                      alt={playerImages[player.username]}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <span className="text-blue text-lg">{player.username}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col w-[100%] justify-center items-center">
                <div className="flex flex-row w-[100%] justify-center items-center ">
                  <h3 className="text-blue text-5xl font-semibold">
                    {" "}
                    {gameCode}{" "}
                  </h3>
                  <Image
                    src={imageAssets.Copy}
                    alt="copy"
                    className="w-[17px] ml-2 cursor-pointer "
                    onClick={handleCopyRoomCode}
                  />
                </div>
                <h3 className="flex justify-center items-center text-blue text-l font-normal">
                  Kodu Arkadaşlarınla Paylaş
                </h3>
              </div>
            </div>
            <div className="space-y-4 w-[100%] flex justify-center">
              {isCreator && (
                <button
                  className="w-[200px] h-[50px] bg-orange text-background-white rounded-full shadow-lg"
                  onClick={handleCreateGame}
                >
                  OYUNU BAŞLAT
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
