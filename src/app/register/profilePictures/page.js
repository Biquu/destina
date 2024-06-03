'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Butterfly from '../../../assets/mascots/Butterfly.png';
import Flag from '../../../assets/logos/Turkiye.png';
import Logo from '../../../assets/logos/Logo.png';
import Female1 from '../../../assets/profilePictures/Female1.png';
import Female2 from '../../../assets/profilePictures/Female2.png';
import Female3 from '../../../assets/profilePictures/Female3.png';
import Female4 from '../../../assets/profilePictures/Female4.png';
import Female5 from '../../../assets/profilePictures/Female5.png';
import Male1 from '../../../assets/profilePictures/Male1.png';
import Male2 from '../../../assets/profilePictures/Male2.png';
import Male3 from '../../../assets/profilePictures/Male3.png';
import Male4 from '../../../assets/profilePictures/Male4.png';
import Male5 from '../../../assets/profilePictures/Male5.png';
import '../../styles/main.css';

const RegisterPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  const images = [
    { src: Female1, alt: "Female1" },
    { src: Female2, alt: "Female2" },
    { src: Female3, alt: "Female3" },
    { src: Female4, alt: "Female4" },
    { src: Female5, alt: "Female5" },
    { src: Male1, alt: "Male1" },
    { src: Male2, alt: "Male2" },
    { src: Male3, alt: "Male3" },
    { src: Male4, alt: "Male4" },
    { src: Male5, alt: "Male5" }
  ];

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
          <Image src={Logo} alt="Logo" />
        </div>
        <div className="flag-container">
          <div className='turkiye-text'>Türkiye</div>
          <Image src={Flag} alt="Flag" />
        </div>
      </div>
      <div className="main-container">
        <div className="centered-container">
          <div className="mascot-container">
            <Image src={Butterfly} alt="Butterfly" className='Butterfly ' />
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
