import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handlePunch = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleHub = () => {
    navigate("/hub");
    setIsMenuOpen(false);
  };

   const handleCalendar = () => {
     navigate("/calendar");
     setIsMenuOpen(false);
   };

    const handleQuote = () => {
      navigate("/quote");
      setIsMenuOpen(false);
    };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full bg-black/20 text-white p-5 px-6 mb-4 rounded-xl fixed top-0 z-30 justify-between">
      <div className="relative flex gap-6 justify-between">
        <button
          onClick={toggleMenu}
          className={`burger-menu-button p-1  focus:outline-none rounded-full ${
            isMenuOpen ? "clicked" : ""
          }`}
        >
          <div className="burger-line" />
          <div className="burger-line" />
          <div className="burger-line" />
        </button>
        <a
          href="https://www.liverightlandscaping.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="relative"
        >
          <img
            src="/icon.png"
            class="w-8 h-8 rounded-full transition duration-500 ease-in-out transform hover:scale-150 cursor-pointer"
            alt="Liveright Landscaping"
          />
        </a>

        {isMenuOpen && (
          <>
            <div
              onClick={toggleMenu}
              className="overlay fixed top-0 left-0 w-full h-screen bg-black opacity-50 z-10"
            ></div>
            <div className="side-menu absolute top-0 left-0 w-64 h-[600px] bg-[#1c1c1c] shadow-lg z-20 px-2 rounded-lg mt-10">
              <div className="flex justify-between items-center py-2 px-4 mb-2">
                <h2 className="text-white font-bold">Menu</h2>
                <button
                  onClick={toggleMenu}
                  className="text-white focus:outline-none focus:ring-2 focus:ring-green-500 h-8 w-8 items-center justify-center flex rounded-full"
                >
                  &times;
                </button>
              </div>
              <div className="pr-6 px-2">
                <button
                  onClick={handlePunch}
                  className="w-full p-4 border-b border-gray-700 mb-4 mt-4 rounded-xl side-menu-btn"
                >
                  Punch Clock
                </button>
                <button
                  onClick={handleHub}
                  className="w-full p-4 border-b border-gray-700 mb-4 mt-4 rounded-xl side-menu-btn"
                >
                  hub
                </button>
                <button
                  onClick={handleCalendar}
                  className="w-full p-4 border-b border-gray-700 mb-4 mt-4 rounded-xl side-menu-btn"
                >
                  Schedule
                </button>
                <button
                  onClick={handleQuote}
                  className="w-full p-4 border-b border-gray-700 mb-4 mt-4 rounded-xl side-menu-btn"
                >
                  Qutoe Calculator
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
