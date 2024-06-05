'use client';

import React, { useState } from 'react';
import Header from '../../components/header'
import CountdownTimer from '../../components/countdownTimer'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import '../styles/main.css';
import { imageAssets } from '@/utils';
import { topicAssets } from '@/utils';
import PlayersList from '../../components/playerList';
import GuessBox from '../../components/guessBox';
import ChatBox from '../../components/chatBox';


export default function homePage() {
  const router = useRouter();

  const playerInfo = [{ name: "Michael", profilePicture: "Male2" },]

  const players = [
    { name: "Helen", profilePicture: "Female1" },
    { name: "Lila", profilePicture: "Female2" },
    { name: "Joe", profilePicture: "Male1" },
    { name: "Michael", profilePicture: "Male2" },
  ];


  return (
    <div className="main-page">
      <Header playerInfo={playerInfo} />
      <CountdownTimer initialTime={105} />
      <div className="flex flex-grow w-full mt-4 h-[75vh]">
        <PlayersList players={players} />
        <GuessBox />
        <ChatBox />
      </div>
    </div >
  );
}
