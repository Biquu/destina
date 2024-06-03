import React from 'react';

const Popup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-[#F3FAF7] bg-opacity-55 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Odada Katıl / Oda Oluştur</h2>
          <button onClick={onClose} className="text-red-500 font-bold">X</button>
        </div>
        <div className="flex justify-between space-x-4">
          <div className="flex flex-col space-y-4">
            <h3 className="text-md font-medium">Odaya Katıl</h3>
            <input type="text" placeholder="Oda Kodu" className="border p-2 rounded" />
            <button className="bg-teal-500 text-white p-2 rounded">KATIL</button>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-md font-medium">Oda Oluştur</h3>
            <div className="flex space-x-2">
              <button className="bg-orange-200 p-2 rounded">3 kişi 10 dk.</button>
              <button className="bg-orange-300 p-2 rounded">4 kişi 20 dk.</button>
              <button className="bg-orange-400 p-2 rounded">5 kişi 35 dk.</button>
            </div>
            <button className="bg-teal-500 text-white p-2 rounded">ODA OLUŞTUR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
