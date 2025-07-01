import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/context';

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="container mx-auto p-6">
      <p className="text-gray-600 text-center text-lg font-medium">Browse through the doctors specialist.</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-6">
        <button
          className={`py-2 px-4 border rounded-lg text-sm transition-all sm:hidden w-full ${showFilter ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 border-gray-400'}`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>

        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((spec) => (
            <p
              key={spec}
              onClick={() => (speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`))}
              className={`w-full sm:w-auto px-4 py-2 shadow-md hover:shadow-lg transition-shadow duration-300 border border-green-400 rounded-lg cursor-pointer ${speciality === spec ? 'bg-indigo-100 text-black' : 'bg-white'}`}
            >
              {spec}
            </p>
          ))}
        </div>

        <div className="w-full flex flex-wrap justify-start gap-6 mt-6 sm:mt-0">
          {filterDoc.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="relative border border-gray-300 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-5px] hover:shadow-lg transition-transform duration-300 w-48"
            >
              <div className="w-full h-40 bg-blue-100">
                <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-green-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-sm font-semibold mt-2">{item.name}</p>
                <p className="text-gray-600 text-xs">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all w-full sm:w-auto"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Doctors;
