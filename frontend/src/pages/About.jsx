import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';

const About = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/tests/ultrasound');
  };

  return (
    <div className="px-4 sm:px-10 md:px-16 lg:px-32 py-10 text-gray-700">

      {/* About Us Header */}
      <div className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-black mb-12 tracking-wide">
        ABOUT <span className="text-black">US</span>
      </div>

      {/* About Us Content */}
      <section className="flex flex-col md:flex-row gap-12 mb-20 items-center animate-fade-in">
        <img
          className="w-full md:max-w-[400px] rounded-xl shadow-2xl"
          src={assets.about_image}
          alt="About Chardham Clinic"
        />
        <div className="flex flex-col gap-6 text-base text-gray-600 leading-relaxed">
          <p>
            Welcome to <strong className="text-black">Chardham Clinic and Diagnostic Center</strong>, where your health and well-being are our top priorities. Located beside Mayal Hotel on Jorethang Road, we are dedicated to delivering exceptional healthcare with compassion and precision.
          </p>
          <p>
            Our skilled and empathetic team ensures you receive personalized attention — whether it's a routine check-up, specialist consultation, or diagnostic test. We strive to provide a caring, comfortable, and state-of-the-art experience.
          </p>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
            <p>
              We envision a world where healthcare goes beyond treatment — empowering individuals to live healthier, happier lives. Through innovation, empathy, and community-first care, we aim to become the region’s most trusted medical center.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Header */}
      <div className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-black to-cyan-800 mb-10">
        WHY <span className="text-black">CHOOSE US</span>
      </div>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
        {[
          {
            title: 'Efficiency',
            description: 'Streamlined appointment scheduling that fits into your busy lifestyle.',
            image: assets.efficiency_icon,
            bg: 'bg-amber-100/40',
            hover: 'hover:border-amber-500',
          },
          {
            title: 'Convenience',
            description: 'Access to a network of trusted healthcare professionals in your area.',
            image: assets.convience_icon,
            bg: 'bg-blue-100/40',
            hover: 'hover:border-blue-500',
          },
          {
            title: 'Personalization',
            description: 'Tailored recommendations and reminders to help you stay on top of your health.',
            image: assets.personalisation_icon,
            bg: 'bg-emerald-100/40',
            hover: 'hover:border-emerald-500',
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`border-2 border-transparent ${item.bg} p-8 rounded-xl text-center shadow-md transition-all duration-300 hover:shadow-lg ${item.hover} hover:scale-105 cursor-pointer`}
          >
            <div className="flex justify-center mb-4">
              <img src={item.image} alt={item.title} className="w-16 h-16" />
            </div>
            <h4 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </section>

      {/* CTA / Ending Note */}
      <div className="text-center mt-16">
        <p className="text-lg font-medium text-gray-700">
          Ready to prioritize your health with a clinic that cares?
        </p>
        <button
          onClick={handleRedirect}
          className="mt-4 bg-cyan-700 text-white px-6 py-2 rounded-full shadow-md hover:bg-cyan-800 transition duration-300"
        >
          Book an Appointment
        </button>
      </div>
    </div>
  );
};

export default About;
