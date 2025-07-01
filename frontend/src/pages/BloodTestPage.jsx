import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added for navigation
import { FaVials } from "react-icons/fa";
import axios from "axios";

const BloodTestPage = () => {
  const [bloodTests, setBloodTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const navigate = useNavigate(); // ✅ Initialize navigate

  useEffect(() => {
    const fetchBloodTests = async () => {
      try {
        const { data } = await axios.get("/api/user/bloodtest/list");
        setBloodTests(data.bloodTests);
      } catch (error) {
        console.error("Error fetching blood tests", error);
      }
    };

    fetchBloodTests();
  }, []);

  const handleCardClick = (test) => {
    setSelectedTest(test);
  };

  const handleBookAppointment = (test) => {
    navigate("/book-test-appointment", {
      state: { selectedTest: { ...test, testType: 'BloodTest' } }, // ✅ Correct enum value
    });
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-12 px-4 sm:px-6 lg:px-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 mb-14 bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
        Blood Test Services
      </h1>

      {/* Grid for blood tests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {bloodTests.length > 0 ? (
          bloodTests.map((test, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(test)}
              className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col items-center justify-center text-center cursor-pointer"
            >
              <div className="text-3xl sm:text-4xl mb-3">
                {test.icon || <FaVials className="text-red-500" />}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{test.name}</h3>
              <p className="text-sm text-gray-500">{test.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No blood tests available at the moment.</p>
        )}
      </div>

      {/* Modal for selected test */}
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
                onClick={() => handleBookAppointment(selectedTest)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 shadow-md"
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Operating Hours</h2>
        <p className="text-lg mb-2">
          Time: <strong>8:00 AM to 6:00 PM</strong>
        </p>
      </div>
    </div>
  );
};

export default BloodTestPage;
