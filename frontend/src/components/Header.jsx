import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Header = () => {
  return (
    <>
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl px-6 md:px-10 lg:px-20 py-12 shadow-lg">
        {/* Left Content */}
        <div className="md:w-1/2 flex flex-col justify-center gap-6 text-white text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-snug">
            Discover Advanced Diagnostics <br />
            Blood Tests & Ultrasounds
          </h1>

          <p className="text-sm md:text-base font-light leading-relaxed text-gray-300">
            Explore a wide variety of essential health diagnostics, including comprehensive blood tests and detailed ultrasound scans.
            Our platform provides quick bookings, accurate reports, and trusted care—all at your fingertips.
          </p>

          <div className="flex items-center gap-4">
            <img className="w-24 md:w-32" src={assets.group_profiles} alt="Diagnostic Profiles" />
            <span className="text-xs text-gray-400">
              Trusted by thousands for fast, secure, and personalized diagnostic services.
            </span>
          </div>

          {/* Call-to-Action Button */}
          <a
  href="#speciality"
  className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-full text-sm shadow-md hover:scale-105 transition-transform duration-300"
>
  View Tests
  <img className="w-3" src={assets.arrow_icon} alt="Arrow Icon" />
</a>

        </div>

        {/* Right Side Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 relative flex justify-center">
          <div className="w-full md:w-[90%] lg:w-[80%] overflow-hidden rounded-lg shadow-lg ring-1 ring-white/10">
            <img
              className="w-full h-auto object-cover"
              src={assets.header_img}
              alt="Diagnostics Banner"
            />
          </div>
        </div>
      </div>

      {/* Scroll Target Section */}
      <div id="speciality" className="mt-20"></div>
    </>
  );
};

export default Header;
