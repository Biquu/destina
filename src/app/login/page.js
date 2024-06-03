'use client';

import { useState } from 'react';
import { loginFormControls } from '@/utils';
import { login } from '@/services/login';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Bear from '../../assets/mascots/Bear3.png';
import Flag from '../../assets/logos/Turkiye.png';
import Logo from '../../assets/logos/Logo.png';
import '../styles/main.css';

const LoginPage = () => {
  const [formData, setFormData] = useState(
    loginFormControls.reduce((acc, control) => {
      acc[control.id] = '';
      return acc;
    }, {})
  );

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(formData);
    console.log(response);
  };

  const handleRegisterClick = () => {
    router.push('/register');
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
            <Image src={Bear} alt="Bear" className='bear' />
          </div>
          <div className="form-container w-[350px]">
            <h1 class="flex justify-center text-dark-blue text-xl font-normal mb-2">Oturum Aç</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {loginFormControls.map((control) => (
                <div key={control.id}>
                  <div className="w-full relative  content-center">
                    {control.id === 'password' && (
                      <span className="absolute w-7 content-center text-blue/50 text-sm mt-1 right-0 mr-[45px]">Parolamı Unuttum</span>
                    )}
                    <input
                      type={control.type}
                      name={control.id}
                      value={formData[control.id]}
                      onChange={handleChange}
                      placeholder={control.placeholder}
                      required
                      className="mt-1 bg-[#E8EFEC] block w-full border border-dark-blue p-2 rounded-[15px] text-blue placeholder:font-medium placeholder:text-blue px-5"
                    />
                  </div>
                </div>
              ))}
              <button type="submit" className="w-full" >GİRİŞ YAP</button>
            </form>
            <div className="flex text-center mt-4">
              <hr className='w-full mt-3 border-blue' />
              <span className='ml-3 mr-3 text-blue'>VEYA</span>
              <hr className='w-full mt-3 border-blue' />
            </div>
            <button className="mt-4  w-full" type="button" onClick={handleRegisterClick}>ZATEN HESABIM VAR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
