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
  const [isOnMail, setIsOnMail] = useState(false);
  const [isOnProfile, setIsOnProfile] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const playerInfo = [{ name: "Michael", profilePicture: "Male2" },]

  const handleToggleMail = () => {
    setIsOnMail(!isOnMail);
  };

  const handleToggleProfile = () => {
    setIsOnProfile(!isOnProfile);
  };

  const handleTheme = () => {
    setIsThemeOpen(!isThemeOpen);
  };

  const handlePassword = () => {
    setIsPasswordOpen(!isPasswordOpen);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="main-page">
      <Header playerInfo={playerInfo} />
      <div className="flex flex-col justify-center min-h-[90vh]">
        <div className="centered-container">
          <div className="mascot-container">
            <Image src={imageAssets.CoyoteBlue} alt="CoyoteBlue" className='bear' />
          </div>
          <div className="w-[500px] flex flex-col">
            <h1 className="flex justify-center text-darkest-blue text-xl font-bold mb-8">Ayarlar</h1>
            <div className='flex flex-col justify-center relative'>
              <h2 className="flex text-left text-dark-blue text-xl font-medium mb-8">Uygulama Bildirimleri</h2>
              <h2 className="flex text-left text-darkest-blue text-xl font-bold mb-8 ml-14 relative cursor-pointer" onClick={handleToggleMail}>E-posta Bildirimleri
                <div
                  className={`w-14 h-7 flex items-center  bg-blue rounded-full cursor-pointer absolute right-0`}
                  onClick={handleToggleMail}
                >
                  <div
                    className={`bg-white w-8 h-8 rounded-full flex justify-center  items-center  shadow-md transform ${isOnMail ? 'translate-x-8' : ''} transition-transform duration-300 ease-in-out`}
                  >
                    <span className={`text-dark-blue text-sm font-semibold  ${isOnMail ? 'text-dark-blue' : 'text-dark-orange'}  `}>
                      {isOnMail ? 'on' : 'off'}
                    </span>
                  </div>
                </div>
              </h2>
              <h2 className="flex text-left text-dark-blue text-xl font-medium mb-8">Gizlilik Ayarları</h2>
              <h2 className="flex text-left text-darkest-blue text-xl font-bold mb-8 ml-14 cursor-pointer" onClick={handleToggleProfile}>Profil Görünürlüğü
                <div
                  className={`w-14 h-7 flex items-center  bg-blue rounded-full cursor-pointer absolute right-0`}
                  onClick={handleToggleProfile}
                >
                  <div
                    className={`bg-white w-8 h-8 rounded-full flex justify-center  items-center  shadow-md transform ${isOnProfile ? 'translate-x-8' : ''} transition-transform duration-300 ease-in-out`}
                  >
                    <span className={`text-dark-blue text-sm font-semibold  ${isOnProfile ? 'text-dark-blue' : 'text-dark-orange'}  `}>
                      {isOnProfile ? 'on' : 'off'}
                    </span>
                  </div>
                </div>
              </h2>
              <h2 className="flex text-left text-dark-blue text-xl font-medium mb-8">Hesap Yönetimi</h2>
              <div className='relative'>
                <h2 className={`flex text-left text-darkest-blue text-xl font-bold ml-14 cursor-pointer relative w-[160px]  ${isPasswordOpen ? 'mb-2' : 'mb-8'} `} onClick={handlePassword}>Parola Değiştir
                </h2>
                {isPasswordOpen && <h2 className="absolute right-0 top-0 text-left text-darkest-orange text-xl font-bold mb-8 ml-14 cursor-pointer">Tamam</h2>}
              </div>
              {isPasswordOpen &&
                <>
                  <h2 className="flex text-left text-darkest-blue text-xl font-bold ml-20 h-14">
                    <div className="w-full relative content-center">
                      <Image className="absolute mt-5 w-5 right-0 mr-3 cursor-pointer" src={imageAssets.Eye} alt="Eye" onClick={togglePasswordVisibility} />
                      <input
                        type={'password' && showPassword ? 'text' : 'password'}
                        name={'passwordOld'}
                        placeholder='Eski Parola'
                        required
                        className="mt-1 bg-[#E8EFEC] block w-full border border-dark-blue p-2 rounded-[15px] text-blue placeholder:font-medium placeholder:text-blue px-5"
                      />
                    </div>
                  </h2>
                  <h2 className="flex text-left text-darkest-blue text-xl font-bold ml-20  h-14">
                  <div className="w-full relative content-center">
                    <Image className="absolute mt-5 w-5 right-0 mr-3 cursor-pointer" src={imageAssets.Eye} alt="Eye" onClick={togglePasswordVisibility} />
                    <input
                      type={'password' && showPassword ? 'text' : 'password'}
                      name={'passwordNewFirst'}
                      placeholder='Yeni Parola'
                      required
                      className="mt-1 bg-[#E8EFEC] block w-full border border-dark-blue p-2 rounded-[15px] text-blue placeholder:font-medium placeholder:text-blue px-5"
                    />
                  </div>
                </h2>
                <h2 className="flex text-left text-darkest-blue text-xl font-bold mb-8 ml-20  h-14">
                  <div className="w-full relative content-center">
                    <Image className="absolute mt-5 w-5 right-0 mr-3 cursor-pointer" src={imageAssets.Eye} alt="Eye" onClick={togglePasswordVisibility} />
                    <input
                      type={'password' && showPassword ? 'text' : 'password'}
                      name={'passwordNewSecond'}
                      placeholder='Yeni Parola Onay'
                      required
                      className="mt-1 bg-[#E8EFEC] block w-full border border-dark-blue p-2 rounded-[15px] text-blue placeholder:font-medium placeholder:text-blue px-5"
                    />
                  </div>
                </h2>
                </>
              }
              <h2 className="flex text-left text-darkest-blue text-xl font-bold mb-8 ml-14 cursor-pointer" onClick={handleTheme}>Tema Değiştir
                <div className='absolute right-0 flex flex-row '>
                  <div className='w-6 h-6 bg-background-white border border-dark-blue rounded-full ml-2'> </div>
                  <div className='w-6 h-6 bg-darkest-blue border border-dark-blue rounded-full ml-2'> </div>
                  <div className='w-6 h-6 bg-dark-blue border border-dark-blue rounded-full ml-2'> </div>
                  <div className='w-6 h-6 bg-blue border border-dark-blue rounded-full ml-2'> </div>
                  <div className='w-6 h-6 bg-darkest-orange border border-dark-blue rounded-full ml-2'> </div>
                  <div className='w-6 h-6 bg-dark-orange border border-dark-blue rounded-full ml-2'> </div>
                  <div className='w-6 h-6 bg-orange border border-dark-blue rounded-full ml-2'> </div>
                </div>
              </h2>
              {isThemeOpen && <>
                <h2 className="flex text-left text-darkest-blue text-xl font-bold mb-8 ml-14 h-6">
                  <div className='absolute right-0 flex flex-row cursor-pointer' onClick={handleTheme}>
                    <div className='w-6 h-6 bg-background-white border border-dark-blue rounded-full ml-2'> </div>
                    <div className='w-6 h-6 bg-darkest-blue border border-dark-blue rounded-full ml-2'> </div>
                    <div className='w-6 h-6 bg-dark-blue border border-dark-blue rounded-full ml-2'> </div>
                    <div className='w-6 h-6 bg-blue border border-dark-blue rounded-full ml-2'> </div>
                    <div className='w-6 h-6 bg-darkest-orange border border-dark-blue rounded-full ml-2'> </div>
                    <div className='w-6 h-6 bg-dark-orange border border-dark-blue rounded-full ml-2'> </div>
                    <div className='w-6 h-6 bg-orange border border-dark-blue rounded-full ml-2'> </div>
                  </div>
                </h2>
              </>}
              <h2 className="flex text-left text-darkest-orange text-xl font-medium mb-8 ml-14 cursor-pointer">Hesabı Sil</h2>
            </div>
          </div>
        </div>
      </div>

    </div >
  );
}
