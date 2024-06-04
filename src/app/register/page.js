'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registrationFormControls } from '@/utils';
import { register } from '@/services/register';
import Image from 'next/image';
import Bear from '../../assets/mascots/Bear2.png';
import Flag from '../../assets/logos/Turkiye.png';
import Logo from '../../assets/logos/Logo.png';
import Eye from '../../assets/components/eye.png';
import '../styles/main.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState(
    registrationFormControls.reduce((acc, control) => {
      acc[control.id] = '';
      return acc;
    }, {})
  );

  const [showPassword, setShowPassword] = useState(false);

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
    const response = await register(formData);
    if (response.success) {
      router.push('/register/profilePictures');
    } else {
      console.log('Registration failed:', response.message);
    }
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            <h1 className="flex justify-center text-dark-blue text-xl font-normal mb-2">Profilini Oluştur</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className='space-y-4 flex justify-center flex-col content-center'>
                {registrationFormControls.map((control) => (
                  <div key={control.id}>
                    {control.componentType === 'input' && (
                      <div className="w-full relative content-center">
                        {control.id === 'password' && (
                          <Image className="absolute mt-4 w-5 right-0 mr-3 cursor-pointer" src={Eye} alt="Eye" onClick={togglePasswordVisibility}/>
                        )}
                        <input
                          type={control.id === 'password' && showPassword ? 'text' : control.type}
                          name={control.id}
                          value={formData[control.id]}
                          onChange={handleChange}
                          placeholder={control.placeholder}
                          required
                          className="mt-1 bg-[#E8EFEC] block w-full border border-dark-blue p-2 rounded-[15px] text-blue placeholder:font-medium placeholder:text-blue px-5"
                        />
                      </div>
                    )}
                    {control.componentType === 'select' && (
                      <select
                        name={control.id}
                        value={formData[control.id]}
                        onChange={handleChange}
                        required
                        className="mt-1 bg-[#E8EFEC] block w-full border border-dark-blue p-2 rounded-[15px] text-blue placeholder:font-medium placeholder:text-blue px-5"
                      >
                        {control.options.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    )}
                    {control.id === 'gender' && (
                      <p className="w-full max-w-96 text-sm text-blue mt-4 text-center">
                        Yaşını ve cinsiyetini sunman doğru Destina tecrübeni edinmeni sağlar. Daha fazla bilgi için lütfen <span className="font-bold">Gizlilik Politikası</span> bölümüne göz at.
                      </p>
                    )}
                  </div>
                ))}
                <button className="w-full" type="submit">HESAP OLUŞTUR</button>
              </div>
            </form>
            <div className="flex text-center mt-4">
              <hr className='w-full mt-3 border-blue' />
              <span className='ml-3 mr-3 text-blue'>VEYA</span>
              <hr className='w-full mt-3 border-blue' />
            </div>
            <button className="mt-4 w-full" type="button" onClick={handleLoginClick}>ZATEN HESABIM VAR</button>
            <p className="w-full max-w-96 text-sm text-blue mt-4 text-center">
              Destina'da oturum açarak, <span className="font-bold">Koşullarımızı</span> ve <span className="font-bold">Gizlilik Politikamızı</span> kabul etmiş olursun.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;