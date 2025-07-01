import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/context';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      {/* Header Section */}
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Responsive Grid Container */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-5 px-3 sm:px-0">
        {/* Mapping through doctors */}
        {relDoc.slice(0, 5).map((item) => (
          <div
            key={item._id}
            onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
            className="relative border border-black rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.7)] transition-all duration-500"
          >
            {/* Image Container */}
            <div className="w-full h-40 bg-blue-50">
              <img
                className="w-full h-full object-cover"
                src={item.image}
                alt={item.name}
              />
            </div>

            {/* Doctor Information */}
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button
        className="mt-8 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition-all"
        onClick={() => {
          navigate('/doctors');
          window.scrollTo(0, 0);
        }}
      >
        More
      </button>
    </div>
  );
};

export default RelatedDoctors;