import React from 'react';

function About() {
  return (
    <div className="mt-20 mb-20 flex flex-col md:flex-row items-center max-w-screen-xl mx-auto p-6">
      {/* Gambar */}
      <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
        <img
          src="/logo_flp.png"
          alt="Logo FLP"
          className="rounded-2xl w-60 sm:w-80 h-auto object-contain"
        />
      </div>

      {/* Teks */}
      <div className="md:w-1/2 p-4 text-center md:text-left">
        <h2 className="font-bold text-3xl sm:text-4xl">
          About <span className="text-indigo-600">Forum Lingkar Pena</span>
        </h2>
        <p className="text-gray-700 mt-4 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, commodi
          doloremque, fugiat illum magni minus nisi nulla numquam obcaecati placeat quia,
          repellat tempore voluptatum.
        </p>
      </div>
    </div>
  );
}

export default About;
