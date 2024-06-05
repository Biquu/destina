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

  const handleStartGame = () => {
    router.push('/game');
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
    </div >
  );
}
