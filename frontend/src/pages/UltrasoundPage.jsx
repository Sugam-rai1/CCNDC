import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Add this
import axios from "axios";
import { FaClock, FaTimesCircle, FaMicroscope } from "react-icons/fa";

const UltrasoundPage = () => {
  const [ultrasoundTests, setUltrasoundTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const navigate = useNavigate(); // 👈 Initialize navigate

  useEffect(() => {
    const fetchUltrasounds = async () => {
      try {
        const { data } = await axios.get("/api/user/ultrasound/list"); 
        setUltrasoundTests(data.ultrasounds);
      } catch (error) {
        console.error("Error fetching ultrasounds", error);
      }
    };

    fetchUltrasounds();
  }, []);

  const handleCardClick = (test) => {
    setSelectedTest(test);
  };

  const handleBooking = () => {
    if (!selectedTest) return; // Safety check
    navigate("/book-test-appointment", { 
      state: { selectedTest: { ...selectedTest, testType: "Ultrasound" } } 
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-12 px-4 sm:px-6 lg:px-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 mb-14">
        Ultrasound & Doppler Services
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ultrasoundTests.map((test, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(test)}
            className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col items-center justify-center text-center cursor-pointer"
          >
            <div className="text-3xl sm:text-4xl mb-3">
              <FaMicroscope className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{test.name}</h3>
            <p className="text-sm text-gray-500">{test.description}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedTest && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full relative">
            <h2 className="text-2xl font-bold mb-4">{selectedTest.name}</h2>
            <p className="text-gray-600 mb-2">{selectedTest.description}</p>
            <p className="text-lg font-semibold text-green-600 mb-6">
              Fees: ₹{selectedTest.price}
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleBooking}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-all duration-300 shadow-md"
              >
                Book Appointment
              </button>

              <button
                onClick={() => setSelectedTest(null)}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-all duration-300 shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Operating Hours */}
      <div className="mt-16 max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-8 text-center">
        <h2 className="text-2xl font-semibold flex items-center justify-center gap-3 text-gray-800 mb-4">
          <FaClock /> Operating Hours
        </h2>
        <p className="text-lg mb-2">
          Time: <strong>9:30 AM to 4:00 PM</strong>
        </p>
        <p className="text-lg text-red-600 flex justify-center items-center gap-2">
          <FaTimesCircle /> Saturday: <strong>Closed</strong>
        </p>
      </div>
    </div>
  );
};

export default UltrasoundPage;
