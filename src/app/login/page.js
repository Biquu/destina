'use client';

import { useState } from 'react';
import { loginFormControls } from '@/utils';
import {login} from '@/services/login';


//BU KISIMLAR BACKEND TARAFINI TEST ETMEK İÇİN OLUŞTURULMUŞTUR VE ASIL PROJEDE KULLANILMAYACAKTIR. 

const LoginPage = () => {
  const [formData, setFormData] = useState(
    loginFormControls.reduce((acc, control) => {
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
    const response = await login(formData);
    console.log(response);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {loginFormControls.map((control) => (
            <div key={control.id}>
              <label className="block text-sm font-medium text-gray-700">{control.label}</label>
              <input
                type={control.type}
                name={control.id}
                value={formData[control.id]}
                onChange={handleChange}
                placeholder={control.placeholder}
                required
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md, text-black"
              />
            </div>
          ))}
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;