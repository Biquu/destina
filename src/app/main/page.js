'use client'

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import '../styles/main.css';
import Bear from '../../assets/mascots/Bear.png';
import Flag from '../../assets/logos/Turkiye.png';
import Logo from '../../assets/logos/Logo.png';

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
          <Image src={Logo} alt="Logo" />
        </div>
        <div className="flag-container">
          <div className='turkiye-text'>Türkiye</div>
          <Image src={Flag} alt="Flag" />
        </div>
      </div>
      <div className="main-container">
        <div className="centered-container">
          <div className="bear-container">
            <Image src={Bear} alt="Bear" className='bear' />
          </div>
          <div className="buttons">
            <button type="submit" onClick={handleRegisterClick}>BAŞLA</button>
            <button type="button" onClick={handleLoginClick}>ZATEN HESABIM VAR</button>
          </div>
        </div>
      </div>
    </div>
  );
}
