import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const {dToken, setDToken} = useContext(DoctorContext)
  const navigate = useNavigate();

  const logout = () => {
    if (aToken) {
      // Clear admin token and localStorage
      setAToken('');
      localStorage.removeItem('aToken');
    }
  
    if (dToken) {
      // Clear doctor token and localStorage
      setDToken('');
      localStorage.removeItem('dToken');
    }
  
    // Ensure navigation happens after state and localStorage updates
    navigate('/');
  };
  

  return (
    <header className="flex items-center px-4 py-3 bg-gradient-to-r from-slate-300 via-slate-700 to-slate-950 shadow-md">
      
      {/* Logo and Panel Label */}
      <div className="flex items-center gap-3">
        <img
          src={assets.logo_icon}
          alt="logo"
          className="w-8 h-8 object-contain drop-shadow-md"
        />
        <div className="leading-tight">
          <h1 className="text-xl font-bold text-white tracking-wide">CCNDC</h1>
          <span className="text-[10px] sm:text-xs font-medium px-2 py-0.5 bg-white text-slate-700 rounded-full shadow-sm">
            {aToken ? 'Admin Panel' : 'Doctor Panel'}
          </span>
        </div>
      </div>

      {/* Logout Button (responsive size) */}
      <div className="ml-auto">
        <button
          onClick={logout}
          className="bg-white text-[10px] sm:text-sm font-semibold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow hover:bg-purple-100 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
