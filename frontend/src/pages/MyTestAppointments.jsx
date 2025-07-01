import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loader2, FlaskConical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyTestAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTestAppointments = async () => {
    try {
      console.log("🔐 Token exists. Fetching appointments...");
      console.log("📡 Sending GET request to:", `${backendUrl}/api/user/bookings`);

      const response = await axios.get(`${backendUrl}/api/user/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Response received:", response.data);

      const fetchedAppointments = response.data.bookings;

      if (response.data.success && Array.isArray(fetchedAppointments)) {
        setAppointments(fetchedAppointments.reverse());
      } else {
        console.warn("⚠️ Appointments not an array or success false", response.data);
        setAppointments([]);
      }
    } catch (error) {
      console.error("❌ Error fetching appointments:", error);
      toast.error(error.response?.data?.message || "Failed to fetch test appointments", {
        position: 'bottom-right',
      });
    } finally {
      setLoading(false);
    }
  };
  const cancelTestAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/cancel-test-appointment`,
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      // Log response for debugging
      console.log("✅ Cancel Response:", response.data);
  
      if (response.data.success) {
        toast.success(response.data.message || 'Appointment cancelled successfully', {
          position: 'bottom-right',
        });
  
        // Update local state to reflect the cancelled appointment
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === appointmentId
              ? { ...appointment, cancelled: true }
              : appointment
          )
        );
      } else {
        toast.error('Failed to cancel appointment', {
          position: 'bottom-right',
        });
      }
    } catch (error) {
      console.error("❌ Cancel error:", error);
      toast.error(error.response?.data?.message || 'Error cancelling appointment', {
        position: 'bottom-right',
      });
    }
  };
  
  useEffect(() => {
    if (token) {
      getTestAppointments();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2 mb-8">
        <FlaskConical className="text-pink-600" size={28} />
        My Test Bookings
      </h2>

      {loading ? (
        <div className="flex justify-center items-center text-gray-500">
          <Loader2 className="animate-spin mr-2" />
          Loading test bookings...
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <FlaskConical className="mx-auto mb-2" size={32} />
          No test bookings found.
        </div>
      ) : (
        <div className="space-y-6 mb-16">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center bg-white p-5 rounded-2xl shadow-md border hover:shadow-2xl transition-all duration-300 hover:border-pink-300 group"
            >
              {/* Icon */}
              <div className="w-24 h-24 flex items-center justify-center bg-pink-100 text-pink-600 text-4xl rounded-xl mb-4 sm:mb-0 sm:mr-6">
                🧪
              </div>

              {/* Info */}
              <div className="flex-1 text-sm text-gray-800 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-neutral-800">{item.testType || "Test"}</p>
                  {!item.cancelled ? (
                    <span className="text-xs font-semibold text-white bg-green-500 px-2 py-1 rounded-full">Active</span>
                  ) : (
                    <span className="text-xs font-semibold text-red-500 border border-red-400 px-2 py-1 rounded-full">Cancelled</span>
                  )}
                </div>

                <p className="text-sm text-pink-600 font-medium">
                  {item.testId?.name || "Test Name Not Available"}
                </p>

                <p className="text-sm">
                  <span className="font-medium text-neutral-700">Test Date: </span>
                  {item.date
                    ? new Date(item.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : "Date not available"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col gap-2 w-full sm:w-auto">
                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelTestAppointment(item._id)}
                    className="text-sm text-center py-2 px-4 border border-red-500 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition duration-200"
                  >
                    ❌ Cancel Appointment
                  </button>
                )}

                {item.cancelled && !item.isCompleted && (
                  <button className="text-sm py-2 px-4 border border-red-300 text-red-500 rounded-md bg-red-50 cursor-not-allowed">
                    Appointment cancelled
                  </button>
                )}

                {item.isCompleted && (
                  <button className="text-sm py-2 px-4 border border-green-500 text-green-600 rounded-lg hover:bg-green-500 hover:text-white transition duration-200">
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTestAppointments;
