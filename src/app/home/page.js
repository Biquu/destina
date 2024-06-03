'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import '../styles/main.css';
import Coyote from '../../assets/mascots/Coyote.png';
import Lion from '../../assets/mascots/Lion.png';
import Flag from '../../assets/logos/Turkiye.png';
import Logo from '../../assets/logos/Logo.png';
import Popup from './Popup'; // Import the popup component

export default function homePage() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const handlePlayRandom = () => {
    console.log('Play Random Game');
  };

  const handlePlayWithFriends = () => {
    setShowPopup(true); // Show the popup when the button is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div className="main-page">
      <div className="header">
        <div className="logo-container">
          <Image src={Logo} alt="Logo" />
        </div>
        <div className="flag-container">
          <div className='turkiye-text'>Türkiye</div>
          <Image src={Flag} alt="Flag" />
        </div>
      </div>
      <div className="main-container">
        <div className="centered-container">
          <div className="mr-20 w-[300px] h">
            <Image src={Lion} alt="Lion" className='' />
          </div>
          <div className="buttons w-[300px]">
            <button type="submit" onClick={handlePlayRandom}>ODA BUL</button>
            <div className="flex text-center mt-4 w-full">
              <hr className='w-full mt-3 border-blue' />
              <span className='ml-3 mr-3 text-blue'>VEYA</span>
              <hr className='w-full mt-3 border-blue' />
            </div>
            <button type="button" onClick={handlePlayWithFriends}>ARKADAŞLARINLA OYNA</button>
          </div>
          <div className="ml-20 w-[300px]">
            <Image src={Coyote} alt="Coyote" className='Coyote' />
          </div>
        </div>
      </div>

      {showPopup && <Popup onClose={handleClosePopup} />} {/* Render the popup */}
    </div>
  );
}
