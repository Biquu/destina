// components/Header.js

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Arrow from '../assets/components/arrow-down-orange.png';
import Pencil from '../assets/components/pencil.png';
import Leave from '../assets/components/leave.png';
import Logo from '../assets/logos/Logo.png';
import { playerImages } from '@/utils';

const Header = ({ playerInfo }) => {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);

  const handleOpenProfileMenu = () => {
    setShowProfile(true); // Show the popup when the button is clicked
  };

  const handleCloseProfileMenu = () => {
    setShowProfile(false); // Close the popup
  };

  const handleProfileClick = () => {
  };

  const handleOptionsClick = () => {
  };

  const handleLogoutClick = () => {
    router.push('/main');
  };

  return (
    <div className="header z-[5] relative">
      <div className="logo-container">
        <Image src={Logo} alt="Logo" />
      </div>
      <div className='relative'>
        <div className="flex justify-center items-center w-[100px] h-[21px] cursor-pointer " onClick={handleOpenProfileMenu}>
          <Image src={Arrow} alt="Arrow" className='w-5 mr-2' />
          <div className='text-xl font-bold text-blue'>Profil</div>
        </div>
        {showProfile &&
          <div className='fixed inset-0 flex justify-center items-center'>
            <div className="fixed inset-0 bg-background-white bg-opacity-55 flex justify-center items-center" onClick={handleCloseProfileMenu}>
            </div>
            <div className="bg-white fixed flex  flex-col p-8 rounded-[90px] shadow-lg w-[330px] h-[300px] absolute top-[50px] right-[10%] items-center">
              <div className='relative fixed flex justify-center cursor-pointer' onClick={handleProfileClick}>
                <Image src={playerImages[playerInfo[0].profilePicture]} alt={playerInfo[0].name} className='w-[162px]' />
                <Image src={Pencil} alt="Pencil" className='absolute w-[44px] right-[3px] top-[120px]' />
              </div>
              <h1 className="flex justify-center text-dark-blue text-xl font-medium mb-2 mt-5 cursor-pointer" onClick={handleOptionsClick}>Ayarlar</h1>
              <div className='flex justify-center items-center cursor-pointer' onClick={handleLogoutClick}>
                <h1 className="flex justify-center text-darkest-orange text-xl font-medium mb-2">Çıkış Yap</h1>
                <Image src={Leave} alt="Leave" className=' w-[20px] pb-2 ml-2' />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Header;
