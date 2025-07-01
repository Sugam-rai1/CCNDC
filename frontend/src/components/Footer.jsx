import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-black/70 text-white py-8 px-6 md:px-12 mx-auto rounded-lg backdrop-blur-xs shadow-xl">
      <div className="flex flex-col md:grid md:grid-cols-3 gap-8">

        {/* Left Section */}
        <div className="text-center md:text-left">
          <img
            src={assets.logo_icon}
            alt="Clinic Logo"
            className="w-16 mx-auto md:mx-0 mb-4 glow-logo"
          />
          <p className="text-sm leading-snug text-gray-300 md:text-base">
            At our clinic, your well-being comes first. Connect with experienced doctors easily and securely. Your health journey starts here—simple, secure, and patient-centered.
          </p>
        </div>

        {/* Center Section */}
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold mb-3 text-cyan-400">COMPANY</p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><NavLink to="/" className="hover:text-cyan-400 transition">Home</NavLink></li>
            <li><NavLink to="/about" className="hover:text-cyan-400 transition">About Us</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-cyan-400 transition">Contact Us</NavLink></li>
            <li><NavLink to="/privacy" className="hover:text-cyan-400 transition">Privacy Policy</NavLink></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold mb-3 text-cyan-400">GET IN TOUCH</p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaPhoneAlt className="text-cyan-400" /> +91 89721 06459
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaPhoneAlt className="text-cyan-400" /> +91 89673 55446
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaEnvelope className="text-cyan-400" />
              <a
                href="mailto:chardhamclinicdiagnosticcentre@gmail.com"
                className="hover:text-cyan-400 transition"
              >
                chardhamclinicdiagnosticcentre@gmail.com
              </a>
            </li>
          </ul>

          {/* Gmail Compose Link */}
          <div className="mt-4">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=chardhamclinicdiagnosticcentre@gmail.com&su=Support%20Request&body=Hi%20CCNDC%20Team%2C%20I%20have%20a%20question%20regarding..."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-all duration-300 inline-block"
            >
              Contact Support via Gmail
            </a>
          </div>

          {/* Social Icons */}
          <div className="mt-4 flex justify-center md:justify-start gap-4">
            <a
              href="https://www.instagram.com/ccndc_n"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-300 hover:text-cyan-400 transition text-lg"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/chardham clinic and diagnostic centre"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-300 hover:text-cyan-400 transition text-lg"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-600 pt-3 text-center text-gray-400">
        <p className="text-xs">© 2025 CCNDC - All Rights Reserved</p>
      </div>

      {/* Glow Effect for Logo */}
      <style>
        {`
          .glow-logo {
            filter: drop-shadow(0 0 6px white);
            transition: filter 0.3s ease;
          }
          .glow-logo:hover {
            filter: drop-shadow(0 0 20px cyan);
          }
        `}
      </style>
    </div>
  );
};

export default Footer;
