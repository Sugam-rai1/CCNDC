import React from 'react';
import { Link } from 'react-router-dom';
import { FaThermometerHalf, FaHeartbeat, FaDumbbell, FaStethoscope } from 'react-icons/fa';

const SpecialityMenu = () => {
  const handleScroll = (direction) => {
    const container = document.getElementById("speciality-scroll-container");
    const scrollAmount = container.offsetWidth / 2;
    if (direction === "right") {
      container.scrollLeft += scrollAmount;
    } else {
      container.scrollLeft -= scrollAmount;
    }
  };

  const testData = [
    {
      image: <FaThermometerHalf className="text-2xl sm:text-3xl text-purple-600" />,
      name: 'Glucose, Fasting',
      price: '₹100',
      description: 'Assesses blood sugar levels after 8 hours of fasting.',
      testType: 'blood',
    },
    {
      image: <FaHeartbeat className="text-2xl sm:text-3xl text-rose-500" />,
      name: 'Lipid Profile',
      price: '₹500',
      description: 'Assesses cholesterol and triglycerides for heart health.',
      testType: 'blood',
    },
    {
      image: <FaDumbbell className="text-2xl sm:text-3xl text-blue-500" />,
      name: 'Upper/Lower Limb Doppler',
      price: '₹3,500',
      description: 'Examines blood flow in upper or lower limb arteries.',
      testType: 'ultrasound',
    },
    {
      image: <FaStethoscope className="text-2xl sm:text-3xl text-indigo-500" />,
      name: 'Breast Ultrasound',
      price: '₹1,500',
      description: 'Imaging of breast tissue to detect abnormalities.',
      testType: 'ultrasound',
    },
    {
      image: <FaHeartbeat className="text-2xl sm:text-3xl text-pink-500" />,
      name: 'Complete Blood Count (CBC)',
      price: '₹150',
      description: 'Detailed analysis of blood components.',
      testType: 'blood',
    },
    {
      image: <FaStethoscope className="text-2xl sm:text-3xl text-green-500" />,
      name: 'Upper Abdomen Ultrasound',
      price: '₹1,200',
      description: 'Imaging of liver, gallbladder, pancreas, kidneys.',
      testType: 'ultrasound',
    },
  ];

  const getRoute = (testType) => {
    return testType === 'blood' ? '/tests/blood' : '/tests/ultrasound';
  };

  return (
    <div className="relative flex flex-col items-center gap-8 py-16 bg-white" id="speciality">
      <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 text-center">Your Health, Your Choice</h1>
      <p className="sm:w-2/3 text-center text-sm text-gray-700 mb-8 px-4 sm:px-0">
        Discover a trusted network of experienced doctors and health tests. Browse specialist profiles, book appointments easily, and receive quality healthcare—all from the comfort of your home.
      </p>

      {/* Mobile View */}
      <div className="w-full flex items-center justify-between sm:hidden px-4 relative">
        <button
          onClick={() => handleScroll("left")}
          className="bg-gray-800 text-white p-2 rounded-full shadow hover:bg-gray-700 transition"
        >
          <svg className="w-4 h-4 transform -rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6l6 6-6 6" />
          </svg>
        </button>

        <div
          id="speciality-scroll-container"
          className="flex gap-6 pt-5 w-full overflow-x-auto scroll-smooth"
        >
          {testData.map((item, index) => (
            <Link
              to={getRoute(item.testType)}
              onClick={() => scrollTo(0, 0)}
              key={index}
              className="min-w-[160px] flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-105"
            >
              <div className="w-16 h-16 rounded-full bg-white border-4 border-white shadow-md hover:shadow-xl flex items-center justify-center mb-2">
                {item.image}
              </div>
              <p className="font-semibold text-gray-800 text-xs sm:text-sm">{item.name}</p>
              <p className="text-xs text-gray-500">{item.price}</p>
              <p className="text-xs text-gray-600 mt-1 px-2">{item.description}</p>
            </Link>
          ))}
        </div>

        <button
          onClick={() => handleScroll("right")}
          className="bg-gray-800 text-white p-2 rounded-full shadow hover:bg-gray-700 transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex gap-10 flex-wrap justify-center pt-5 px-10">
        {testData.map((item, index) => (
          <Link
            to={getRoute(item.testType)}
            onClick={() => scrollTo(0, 0)}
            key={index}
            className="flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:scale-105"
          >
            <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-md hover:shadow-xl flex items-center justify-center mb-3">
              {item.image}
            </div>
            <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
            <p className="text-sm text-gray-500">{item.price}</p>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
