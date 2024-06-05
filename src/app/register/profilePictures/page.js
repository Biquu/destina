'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { images } from '@/utils';
import { imageAssets } from '@/utils';

import '../../styles/main.css';

const RegisterPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  const handleImageClick = (index) => {
    setSelectedImage(index);
    console.log(`Selected image: ${images[index].alt}`);
  };

  const handleClick = () => {
    router.push('/home');
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
            <Image src={imageAssets.Butterfly} alt="Butterfly" className='Butterfly ' />
          </div>
          <div className="form-container w-[350px] ml-10">
            <h1 className="flex justify-center text-dark-blue text-xl font-normal ">Profil Fotoğrafını Seç</h1>
            <div className="grid grid-cols-3 gap-5 p-10">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`w-25 rounded-full cursor-pointer shadow-lg hover:shadow-blue/50 ${selectedImage === index ? 'opacity-100' : 'opacity-30'}`}
                  onClick={() => handleImageClick(index)}
                >
                  <Image src={image.src} alt={image.alt} className="rounded-full" />
                </div>
              ))}
            </div>
            <div className='w-full flex justify-center  '><button className="w-4/5" type="submit" onClick={handleClick}>DEVAM ET</button></div>
            <p className="w-full max-w-96 text-sm text-blue text-center p-5">
              Diğer insanlara nasıl görüneceğini seç. Unutma, burada yanlış bir cevap yok. İyi eğlenceler!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;