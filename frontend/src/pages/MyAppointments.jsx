import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loader2, CalendarCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const { backendUrl, token, userData, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch appointments", {
        position: 'bottom-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    if (!userData) {
      toast.warn("Please log in first.", {
        position: 'bottom-right',
      });
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId, userId: userData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message, {
          position: 'bottom-right',
        });
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message, {
          position: 'bottom-right',
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error canceling appointment.", {
        position: 'bottom-right',
      });
    }
  };

  const confirmCOD = async (appointmentId) => {
    try {
      const res = await fetch('/api/user/confirm-cod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ appointmentId }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(
          <div className="flex items-center space-x-3">
            <span className="text-xl text-green-600">💵</span>
            <span>Payment confirmed as Cash on Delivery</span>
          </div>,
          {
            className: "bg-green-50 text-green-700 border-green-400",
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
          }
        );

        getUserAppointments(); // Refresh after confirming COD
      } else {
        toast.error(data.message, {
          className: "bg-red-50 text-red-700 border-red-400",
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
        });
      }
    } catch (err) {
      console.error("COD Error:", err);
      toast.error("Something went wrong", {
        className: "bg-red-50 text-red-700 border-red-400",
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
      });
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2 mb-8">
        <CalendarCheck className="text-indigo-600" size={28} />
        My Appointments
      </h2>

      {loading ? (
        <div className="flex justify-center items-center text-gray-500">
          <Loader2 className="animate-spin mr-2" />
          Loading appointments...
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <CalendarCheck className="mx-auto mb-2" size={32} />
          No appointments found.
        </div>
      ) : (
        <div className="space-y-6 mb-16">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center bg-white p-5 rounded-2xl shadow-md border hover:shadow-2xl transition-all duration-300 hover:border-indigo-300 group"
            >
              <img
                className="w-24 h-24 object-cover rounded-xl border border-gray-300 shadow-md mb-4 sm:mb-0 sm:mr-6 group-hover:scale-105 transition-transform"
                src={item.docData.image || "/default-doc.png"}
                alt={item.docData.name}
              />

              <div className="flex-1 text-sm text-gray-800 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-neutral-800">{item.docData.name}</p>
                  {!item.cancelled ? (
                    <span className="text-xs font-semibold text-white bg-green-500 px-2 py-1 rounded-full">Active</span>
                  ) : (
                    <span className="text-xs font-semibold text-red-500 border border-red-400 px-2 py-1 rounded-full">Cancelled</span>
                  )}
                </div>

                <p className="text-sm text-indigo-600 font-medium">{item.docData.speciality}</p>

                <div>
                  <p className="font-medium text-gray-700">Address:</p>
                  <p className="text-xs">{item.docData.address.line1}</p>
                  <p className="text-xs">{item.docData.address.line2}</p>
                </div>

                <p className="text-sm">
                  <span className="font-medium text-neutral-700">Date & Time: </span>
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col gap-2 w-full sm:w-auto">
                {/* Show payment options only if not cancelled and not confirmed COD */}
                {!item.cancelled && item.payment !== 'cod' && !item.isCompleted && (
                  <>
                    <button
                      onClick={() => toast.error("Online payment is not available at the moment.")}
                      className="text-sm text-center py-2 px-4 border border-green-500 rounded-lg text-green-600 hover:bg-green-500 hover:text-white transition duration-200"
                    >
                      💳 Pay Online
                    </button>
                    <button
                      onClick={() => confirmCOD(item._id)}
                      className="text-sm text-center py-2 px-4 border border-yellow-500 rounded-lg text-yellow-600 hover:bg-yellow-500 hover:text-white transition duration-200"
                    >
                      💵 Pay via Cash (COD)
                    </button>
                  </>
                )}

                {/* COD confirmed */}
                {item.payment === 'cod' && !item.cancelled && !item.isCompleted &&  (
                  <button
                    onClick={() => cancelAppointment(item._id)}
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

export default MyAppointments;
