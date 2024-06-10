'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function Result() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const prediction = searchParams.get('prediction');

  const handleClick = (interest) => {
    router.push(`/research?topic=${encodeURIComponent(interest)}`);
  };

  const buttonColors = [
    'bg-[#249EA0] hover:bg-[#008083] text-[#F3FAF7]',  // Button 1: Blue
    'bg-[#ffffff] hover:bg-[#e0f7f6] text-[#249EA0]',  // Button 2: White
    'bg-[#249EA0] hover:bg-[#008083] text-[#F3FAF7]',  // Button 3: Blue
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3FAF7]">
      <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-darkest-blue">Predicted Interests</h1>
        {prediction ? (
          <div className="flex flex-col space-y-4">
            {JSON.parse(prediction).map((interest, index) => (
              <button
                key={index}
                className={`py-2 px-4 rounded font-bold transition-shadow duration-300 ease-in-out ${buttonColors[index % buttonColors.length]}`}
                onClick={() => handleClick(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No prediction available</p>
        )}
      </div>
    </div>
  );
}
