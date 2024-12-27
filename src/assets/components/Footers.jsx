import React from 'react';

const Footer = () => {
  return (
    <div className="text-center mt-4 bg-slate-800">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-700">Op/ &gt;</span>
        </div>
      <p className="flex justify-center items-center gap-1 text-white">
        Created With 
        <span className="inline-block text-red-500 animate-none hover:animate-beat">
          ♥
        </span> 
        By Prem Satarekar
      </p>
    </div>
  );
};

export default Footer;
