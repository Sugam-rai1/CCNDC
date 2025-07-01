import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import { AppContext } from '../context/context';

const Banner = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const handleButtonClick = () => {
    if (token) {
      navigate('/tests/blood');
    } else {
      navigate('/login');
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-900 rounded-xl overflow-hidden px-6 sm:px-10 md:px-14 lg:px-12 my-20 mx-4 md:mx-10 shadow-2xl">
      {/* ---------------------- Left Side ---------------- */}
      <div className="flex-1 py-10 sm:py-12 md:py-16 lg:pl-5 flex flex-col justify-center">
        <div className="text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Trusted Diagnostic Centre
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-medium">
            Book Blood Tests & Ultrasounds Instantly
          </p>
        </div>

        {/* Offer Block */}
        <div className="mt-6 p-4 bg-pink-100 border-2 border-pink-500 rounded-xl text-center shadow-md">
          <h3 className="text-lg sm:text-xl text-pink-800 font-bold">Special Offer</h3>
          <p className="text-pink-700 font-medium text-sm sm:text-base mt-1">
            Get <span className="font-bold">20% OFF</span> on <span className="font-semibold">Blood Tests</span> for
            <span className="font-bold"> Senior Citizens</span> and <span className="font-bold">BPL Category</span>
          </p>
          <p className="text-xs text-gray-600 mt-1 italic">* Valid DESME certificate required</p>
        </div>

        {/* Button */}
        <button
          onClick={handleButtonClick}
          className="bg-white text-sm sm:text-base text-gray-800 font-semibold px-6 py-2 rounded-full mt-6 hover:scale-105 hover:bg-gray-100 transition-transform duration-300 w-max shadow-md"
        >
          {token ? 'Explore Tests' : 'Get Started'}
        </button>
      </div>

      {/* ---------------------- Right Side ---------------- */}
      <div className="hidden md:flex md:items-end md:justify-end md:w-1/2 lg:w-[370px] relative">
        <img
          className="w-full max-w-md absolute bottom-0 right-0"
          src={assets.appointment_img}
          alt="Diagnostics"
        />
      </div>
    </div>
  );
};

export default Banner;
