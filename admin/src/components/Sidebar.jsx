import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const [isOpen, setIsOpen] = useState(false);

  const adminLinks = [
    { to: '/admin-dashboard', label: 'Dashboard', icon: assets.home_icon },
    { to: '/all-appointments', label: 'Appointments', icon: assets.appointment_icon },
    { to: '/add-doctor', label: 'Add Doctor', icon: assets.add_icon },
    { to: '/doctors-list', label: 'Doctor List', icon: assets.people_icon },
    { to: '/add-service', label: 'Add Service', icon: assets.add_icon },
    { to: '/manage-appointments', label: 'Manage Appointments', icon: assets.appointment_icon },
  ];

  const doctorLinks = [
    { to: '/doctor-dashboard', label: 'Dashboard', icon: assets.home_icon },
    { to: '/doctor-appointments', label: 'Appointments', icon: assets.appointment_icon },
    { to: '/profile', label: 'Profile', icon: assets.people_icon },
  ];

  const links = aToken ? adminLinks : dToken ? doctorLinks : [];

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-4 py-3 px-6 rounded-xl mx-4 text-sm font-medium tracking-wide transition-all duration-300 ${
      isActive
        ? 'bg-slate-900 text-white shadow-md shadow-slate-400'
        : 'text-gray-700 hover:bg-slate-100 hover:shadow-sm'
    }`;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={assets.menu_icon} alt="menu" className="w-6 h-6" />
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white/95 backdrop-blur border-r shadow-lg z-40 transform transition-transform duration-300 sm:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="mt-10 flex flex-col gap-2">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              <img src={icon} alt={label} className="w-5 h-5 opacity-80" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden sm:block w-64 bg-white border-r shadow-lg overflow-hidden">
      <nav className="mt-10 flex flex-col gap-2 pb-6">

          {links.map(({ to, label, icon }) => (
            <NavLink key={to} to={to} className={navLinkClass}>
              <img src={icon} alt={label} className="w-5 h-5 opacity-80" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
