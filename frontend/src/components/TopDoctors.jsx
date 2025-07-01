import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-6 my-16 text-gray-900 md:mx-10">
      {/* Header Section */}
      <h1 className="text-4xl font-semibold text-center text-indigo-800">Top Doctors to Book</h1>
      <p className="sm:w-2/3 text-center text-sm text-gray-700 mb-6">
        Simply browse through our extensive list of trusted doctors and book your appointment with ease.
      </p>

      {/* Responsive Grid Container */}
      <div className="w-full grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] gap-6 pt-5 gap-y-8 px-4 sm:px-0 place-items-center">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="w-full max-w-[250px] relative border border-gray-200 rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <div className="w-full h-32 bg-gray-100 overflow-hidden rounded-t-xl">
              <img
                className="w-full h-full object-cover"
                src={item.image}
                alt={item.name}
              />
            </div>

            {/* Doctor Information */}
            <div className="p-4">
              <div className={`flex items-center gap-2 ${item.available ? 'text-green-500' : 'text-gray-600'} text-sm`}>
                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-600'} rounded-full`}></p>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              <p className="text-gray-900 text-lg font-semibold mt-2">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button
        className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0);
        }}
      >
        View All Doctors
      </button>
    </div>
  );
};

export default TopDoctors;
