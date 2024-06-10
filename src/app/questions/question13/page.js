'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Question13() {
  const router = useRouter();
  const [answer, setAnswer] = useState('');

  const handleNext = () => {
    localStorage.setItem('Interest in Technology', answer);
    router.push('/questions/question14');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3FAF7]">
      <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-darkest-blue">Teknolojiye olan ilginiz nedir? (0-10 arası bir değer giriniz)</h1>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleNext}
          className="w-full py-2 px-4 bg-[#249EA0] hover:bg-[#008083] text-white rounded font-bold transition-shadow duration-300 ease-in-out"
        >
          Next
        </button>
      </div>
    </div>
  );
}
