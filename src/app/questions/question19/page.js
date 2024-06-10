'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Question19() {
  const router = useRouter();
  const [answer, setAnswer] = useState('');

  const handlePredict = async () => {
    localStorage.setItem('Traveling', answer);

    const formData = {
      Gender: localStorage.getItem('Gender'),
      Age: localStorage.getItem('Age'),
      'Reading Books': localStorage.getItem('Reading Books'),
      'Archival Research': localStorage.getItem('Archival Research'),
      'Listening Music': localStorage.getItem('Listening Music'),
      'Visiting Museums': localStorage.getItem('Visiting Museums'),
      'Interest in Software and Computers': localStorage.getItem('Interest in Software and Computers'),
      'Interest in Dancing': localStorage.getItem('Interest in Dancing'),
      'Watching Sports': localStorage.getItem('Watching Sports'),
      'Following Science Symposiums': localStorage.getItem('Following Science Symposiums'),
      'Interest in Science': localStorage.getItem('Interest in Science'),
      'Interest in Space Science': localStorage.getItem('Interest in Space Science'),
      'Interest in Technology': localStorage.getItem('Interest in Technology'),
      'Questioning Life': localStorage.getItem('Questioning Life'),
      'Thinking about Social Issues': localStorage.getItem('Thinking about Social Issues'),
      Cooking: localStorage.getItem('Cooking'),
      'Interest in Literature': localStorage.getItem('Interest in Literature'),
      'Thinking about General Problems': localStorage.getItem('Thinking about General Problems'),
      Traveling: localStorage.getItem('Traveling')
    };

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/result?prediction=${encodeURIComponent(JSON.stringify(data.prediction))}`);
      } else {
        console.error('Prediction failed');
      }
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3FAF7]">
      <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-darkest-blue">Seyahat etmeyi sever misiniz?</h1>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handlePredict}
          className="w-full py-2 px-4 bg-[#249EA0] hover:bg-[#008083] text-white rounded font-bold transition-shadow duration-300 ease-in-out"
        >
          Predict
        </button>
      </div>
    </div>
  );
}
