import React, { useState, useEffect, useRef, useContext } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showTestDropdown, setShowTestDropdown] = useState(false);
  const [mobileTestDropdown, setMobileTestDropdown] = useState(false);

  const profileRef = useRef(null);
  const testRef = useRef(null);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (testRef.current && !testRef.current.contains(event.target)) {
        setShowTestDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-grey-400 px-4 sm:px-10'>
      {/* Logo and Clinic Name */}
      <div className='flex items-center gap-4 cursor-pointer' onClick={() => navigate('/')}>
        <img
          src={assets.logo_icon}
          alt='Logo'
          className='w-10 sm:w-14 rounded-full transition-all duration-500 hover:scale-110 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
        />
        <div className='flex flex-col'>
          <h1 className="text-sm sm:text-lg font-semibold bg-gradient-to-r from-blue-700 via-gray-800 to-gray-900 text-transparent bg-clip-text leading-tight">
            Chardham Clinic & Diagnostic Center
          </h1>
          <p className='text-xs sm:text-sm text-gray-700'>Leading you to better health</p>
        </div>
      </div>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex items-center gap-5 font-medium relative'>
        {[{ path: '/', label: 'HOME' }, { path: '/doctors', label: 'ALL DOCTORS' }, { path: '/about', label: 'ABOUT' }, { path: '/contact', label: 'CONTACT' }].map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `py-1 relative group ${isActive ? 'text-black' : 'text-gray-700'}`
            }
          >
            {link.label}
            <span className='absolute left-0 bottom-0 w-3/5 h-0.5 m-auto bg-black transition-transform scale-x-0 group-hover:scale-x-100'></span>
          </NavLink>
        ))}

        {/* Test Dropdown */}
        <div className='relative group' ref={testRef}>
          <button
            onClick={() => setShowTestDropdown((prev) => !prev)}
            className='py-1 text-gray-700 hover:text-black transition focus:outline-none relative'
          >
            ALL TEST
            <span className='absolute left-0 bottom-0 w-3/5 h-0.5 m-auto bg-black transition-transform scale-x-0 group-hover:scale-x-100'></span>
          </button>
          {showTestDropdown && (
            <div className='absolute top-full left-0 mt-2 w-40 bg-white shadow-md rounded-md z-50'>
              <NavLink
                to='/tests/ultrasound'
                onClick={() => setShowTestDropdown(false)}
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded'
              >
                Ultrasound
              </NavLink>
              <NavLink
                to='/tests/blood'
                onClick={() => setShowTestDropdown(false)}
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded'
              >
                Blood Test
              </NavLink>
            </div>
          )}
        </div>
      </ul>

      {/* Right Side Buttons */}
      <div className='flex items-center gap-3 sm:gap-6'>
        {token && userData ? (
          <div className='relative' ref={profileRef}>
            <img
              src={userData.image}
              alt='User'
              className='w-8 sm:w-14 min-w-[40px] sm:min-w-[56px] rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform'
              onClick={() => setShowProfileDropdown((prev) => !prev)}
            />
            {showProfileDropdown && (
              <div className='absolute top-14 right-0 w-40 bg-white rounded-lg shadow-xl border border-gray-200 z-20 transition-all duration-300'>
                <div className='flex flex-col gap-4 p-4 text-sm text-gray-700'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={() => navigate('/tests/appointment')} className='hover:text-black cursor-pointer'>My Test Appointments</p>
                  <p onClick={logout} className='hover:text-red-600 cursor-pointer'>Logout</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='px-3 sm:px-4 py-1 sm:py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition text-xs sm:text-base'
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Button */}
        <FiMenu
          onClick={() => setShowMenu(true)}
          className='w-6 h-6 sm:w-7 sm:h-7 md:hidden cursor-pointer ml-2 text-gray-800 hover:text-black'
        />
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 transition-transform duration-500 ${showMenu ? 'translate-x-0' : 'translate-x-full'} transform`}>
        <div className='absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm'></div>
        <div className='relative w-full h-full flex flex-col bg-cover bg-center' style={{ backgroundImage: `url(${assets.menu_bg})` }}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-14 rounded-full hover:bg-gray-300 p-1 transition-all duration-300' src={assets.logo_icon} alt='logo' />
            <FiX
              className='w-8 h-8 sm:w-10 sm:h-10 cursor-pointer text-white hover:rotate-90 transition-transform duration-300'
              onClick={() => setShowMenu(false)}
            />
          </div>
          <div className='flex flex-col gap-6 px-5 justify-center items-center h-full text-white text-sm sm:text-lg font-semibold'>
            {[{ path: '/', label: 'Home' }, { path: '/doctors', label: 'All DOCTORS' }, { path: '/about', label: 'ABOUT' }, { path: '/contact', label: 'CONTACT' }].map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setShowMenu(false)}
                className='hover:text-yellow-300 hover:scale-105 transform transition duration-300 drop-shadow-lg text-center w-full'
              >
                {link.label}
              </NavLink>
            ))}

            <div className='text-white text-center w-full'>
              <button
                className='text-lg font-semibold mb-2'
                onClick={() => setMobileTestDropdown((prev) => !prev)}
              >
                ALL TEST
              </button>
              {mobileTestDropdown && (
                <div className='flex flex-col gap-2'>
                  <NavLink
                    to='/tests/ultrasound'
                    onClick={() => {
                      setShowMenu(false);
                      setMobileTestDropdown(false);
                    }}
                    className='transition-all duration-300 hover:text-yellow-300 hover:scale-105'
                  >
                    - Ultrasound
                  </NavLink>
                  <NavLink
                    to='/tests/blood'
                    onClick={() => {
                      setShowMenu(false);
                      setMobileTestDropdown(false);
                    }}
                    className='transition-all duration-300 hover:text-yellow-300 hover:scale-105'
                  >
                    - Blood Test
                  </NavLink>
                  <NavLink
                    to='/tests/appointment'
                    onClick={() => {
                      setShowMenu(false);
                      setMobileTestDropdown(false);
                    }}
                    className='transition-all duration-300 hover:text-yellow-300 hover:scale-105'
                  >
                    - Test Appointment
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
