'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registrationFormControls } from '@/utils';
import { register } from '@/services/register';
import Image from 'next/image';
import Bear from '../../assets/mascots/Bear2.png';
import Flag from '../../assets/logos/Turkiye.png';
import Logo from '../../assets/logos/Logo.png';
import '../styles/main.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState(
    registrationFormControls.reduce((acc, control) => {
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
    const response = await register(formData);
    console.log(response);
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
          <div className="form-container">
            <h1>Profilini Oluştur</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {registrationFormControls.map((control) => (
                <div key={control.id}>
                  <label className="block text-sm font-medium text-gray-700">{control.label}</label>
                  <input
                    type={control.type}
                    name={control.id}
                    value={formData[control.id]}
                    onChange={handleChange}
                    placeholder={control.placeholder}
                    required
                    className="mt-1 block w-full border border-gray-300 p-2 rounded-md text-black"
                  />
                </div>
              ))}
              <button type="submit">HESAP OLUŞTUR</button>
            </form>
            <div className="mt-4 text-center">
              <button type="button" onClick={handleLoginClick}>ZATEN HESABIM VAR</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
