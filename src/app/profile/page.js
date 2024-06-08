'use client';

import React, { useState } from 'react';
import Header from '../../components/header'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import '../styles/main.css';
import { imageAssets } from '@/utils';
import { playerImages } from '@/utils';
import { editFormControls } from '@/utils';


export default function homePage() {
  const router = useRouter();


  const playerInfo = [{ name: "Michael", profilePicture: "Male2" },]


  const [formData, setFormData] = useState(
    editFormControls.reduce((acc, control) => {
      acc[control.id] = '';
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const response = await login(formData);
    //buraya submit kısmını yazınız.
    console.log(response);
  };

  return (
    <div className="main-page">
      <Header playerInfo={playerInfo} />
      <div className="flex flex-col justify-center min-h-[90vh]">
        <div className="centered-container">
          <div className="mascot-container">
            <div className="flex flex-col justify-center items-center  relative mr-20" >
              <div className=" relative">
                <Image src={playerImages[playerInfo[0].profilePicture]} alt={playerInfo[0].name} className='w-[250px]' />
                <Image src={imageAssets.Pencil} alt="Pencil" className='absolute w-[44px] right-[20px] bottom-0 cursor-pointer' />
              </div>
              <div className='flex flex-row mt-5 gap-4'>
                <div className={`bg-[#E8EFEC] block w-full border border-dark-blue p-1 rounded-[15px] 
                 text-blue placeholder:font-medium placeholder:text-blue px-3 relative pr-8`}>
                  <h1 class="flex justify-center text-blue text-xl font-bold">1423</h1>
                  <Image src={imageAssets.Elo} alt="Elo" className='absolute w-6 right-1 bottom-1.5' />
                </div>
                <div className={`bg-[#E8EFEC] block w-full border border-dark-blue p-1 rounded-[15px] 
                 text-blue placeholder:font-medium placeholder:text-blue px-3 relative pr-8`}>
                  <h1 class="flex justify-center text-blue text-xl font-bold">1423</h1>
                  <Image src={imageAssets.Wins} alt="Wins" className='absolute w-5 right-2 bottom-1.5' />
                </div>
              </div>
              <p className="w-full w-full text-sm text-blue mt-4 text-center">
              Bu bölümde, diğer kullanıcılar tarafından aldığınız övgüleri, başarılı oyun oranınızı ve toplam 
              kazandığınız oyun sayısını görebilirsiniz.
              </p>
            </div>
          </div>
          <div className="w-[500px] flex flex-col">
            <h1 class="flex justify-center text-darkest-blue text-xl font-bold mb-2">Oturum Aç</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {editFormControls.map((control) => (
                <div key={control.id}>
                  {control.id === 'age' &&
                    <h1 class="flex text-dark-blue text-xl font-medium">Yaş</h1>
                  }
                  {control.id === 'gender' &&
                    <h1 class="flex text-dark-blue text-xl font-medium">Cinsiyet</h1>
                  }
                  {control.id === 'username' &&
                    <h1 class="flex text-dark-blue text-xl font-medium">Rumuz</h1>
                  }
                  {control.id === 'email' &&
                    <h1 class="flex text-dark-blue text-xl font-medium">E-Posta</h1>
                  }
                  <div className="w-full relative  content-center">
                    <div className={`w-9 h-9 border border-dark-blue absolute right-3 bottom-[-22px] rounded-full flex justify-center items-center
                      ${control.id === 'age' && "bg-orange"}
                      ${control.id === 'gender' && "bg-dark-orange"}
                      ${control.id === 'username' && "bg-dark-orange"}
                      ${control.id === 'email' && "bg-darkest-orange"}`}>
                      <Image src={imageAssets.PencilOnly} alt="Pencil" className='w-[60%]' />
                    </div>
                    <input
                      type={control.type}
                      name={control.id}
                      value={formData[control.id]}
                      onChange={handleChange}
                      placeholder={control.placeholder}
                      required
                      className={`focus:outline-darkest-blue bg-[#E8EFEC] block w-full border border-dark-blue p-2 rounded-[15px] ${control.id === 'age' && "pr-16"} text-blue placeholder:font-medium placeholder:text-blue px-5`}
                    />
                  </div>
                </div>
              ))}
              <div className='flex flex-row pt-6 block w-full'>
                <button type="button" className="w-full mr-2" >İPTAL</button>
                <button type="submit" className="w-full ml-2" >GİRİŞ YAP</button>
              </div>
            </form>
            <p className="w-full w-full text-sm text-blue mt-4 text-center">
              Profil bilgilerinizi kaydederek, bilgilerinizin güncelleneceğini ve Destina'nın Gizlilik Politikası
              ve Kullanım Koşulları çerçevesinde işleneceğini kabul etmiş olursunuz.
            </p>
          </div>


        </div>
      </div>

    </div >
  );
}
