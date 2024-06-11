/*'use client'

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { imageAssets } from '@/utils';
import './styles/main.css';

export default function MainPage() {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push('/register');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className="main-page">
      <div className="header">
        <div className="logo-container">
          <Image src={imageAssets.Logo} alt="Logo" />
        </div>
        <div className="flag-container">
          <div className='turkiye-text'>Türkiye</div>
          <Image src={imageAssets.Flag} alt="Flag" />
        </div>
      </div>
      <div className="flex flex-col justify-center min-h-[90vh]">
        <div className="centered-container">
          <div className="mascot-container">
            <Image src={imageAssets.Bear} alt="Bear" className='bear' />
          </div>
          <div className="buttons">
            <button type="submit" onClick={handleRegisterClick}>BAŞLA</button>
            <button type="button" onClick={handleLoginClick}>ZATEN HESABIM VAR</button>
          </div>
        </div>
      </div>
    </div>
  );
} */
"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div>
      <p>Status: { isConnected ? "connected" : "disconnected" }</p>
      <p>Transport: { transport }</p>
    </div>
  );
}
