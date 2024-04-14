import React from 'react';
import Bot from '../assets/chatbot.png'

const Navbar = () => {
  return (
    <nav className="bg-[#27282A] py-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={Bot} alt="TextBot" className="h-8 w-auto mr-2" />
          <span className="text-white text-lg font-semibold">TextBot</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
