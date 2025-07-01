import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat } = useContext(AppContext);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const handleCancel = async (appointmentId) => {
    if (!appointmentId) return;
    if (!window.confirm('Cancel this appointment?')) return;

    try {
      setLoadingId(appointmentId);
      await cancelAppointment(appointmentId);
    } catch (error) {
      console.error('Error cancelling:', error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleComplete = async (appointmentId) => {
    if (!appointmentId) return;
    if (!window.confirm('Mark as completed?')) return;

    try {
      setLoadingId(appointmentId);
      await completeAppointment(appointmentId);
    } catch (error) {
      console.error('Error completing:', error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-6 px-4">
      <p className="mb-4 text-2xl font-semibold text-gray-800">All Appointments</p>

      <div className="bg-white border rounded-lg shadow-md text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-[40px_1.5fr_0.7fr_1.5fr_1.5fr_0.7fr_1fr] py-3 px-6 border-b bg-gray-100 font-semibold text-gray-700 text-center">
          <p>#</p>
          <p className="text-left">Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Payment</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointments */}
        {appointments.length === 0 ? (
          <p className="p-6 text-gray-500 text-center">No appointments found.</p>
        ) : (
          appointments.map((item, index) => (
            <div
              key={item._id || index}
              className="border-b px-4 md:px-6 py-4 text-gray-700 hover:bg-gray-50"
            >
              {/* Mobile View */}
              <div className="md:hidden space-y-2">
                <div className="flex items-center gap-3">
                  <img
                    src={item.userData?.image || `https://ui-avatars.com/api/?name=${item.userData?.name}`}
                    alt={item.userData?.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                  />
                  <div>
                    <p className="font-medium">{item.userData?.name}</p>
                    <p className="text-xs text-gray-500">Age: {calculateAge(item.userData?.dob)}</p>
                  </div>
                </div>
                <p className="text-sm">
                  <strong>Date:</strong> {slotDateFormat(item.slotDate)} at {item.slotTime}
                </p>
                <p className="text-sm">
                  <strong>Payment:</strong> {item.payment === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                </p>
                <p className="text-sm">
                  <strong>Fees:</strong> ₹{item.amount}
                </p>
                <div className="flex items-center gap-3">
                  {item.cancelled ? (
                    <span className="text-red-500 font-medium text-sm">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="text-green-500 font-medium text-sm">Completed</span>
                  ) : (
                    <>
                      <img
                        onClick={() => handleCancel(item._id)}
                        className={`w-6 cursor-pointer transition-opacity ${
                          loadingId === item._id ? 'opacity-50 pointer-events-none' : ''
                        }`}
                        src={assets.cancel_icon}
                        alt="Cancel"
                        title="Cancel Appointment"
                      />
                      <img
                        onClick={() => handleComplete(item._id)}
                        className={`w-6 cursor-pointer transition-opacity ${
                          loadingId === item._id ? 'opacity-50 pointer-events-none' : ''
                        }`}
                        src={assets.tick_icon}
                        alt="Complete"
                        title="Mark as Completed"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Desktop Row */}
              <div className="hidden md:grid grid-cols-[40px_1.5fr_0.7fr_1.5fr_1.5fr_0.7fr_1fr] items-center text-center">
                <p>{index + 1}</p>
                <div className="flex items-center gap-3 text-left">
                  <img
                    src={item.userData?.image || `https://ui-avatars.com/api/?name=${item.userData?.name}`}
                    alt={item.userData?.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                  />
                  <p className="font-medium truncate">{item.userData?.name}</p>
                </div>
                <p>{calculateAge(item.userData?.dob)}</p>
                <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                <p>{item.payment === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
                <p>{item.amount}</p>
                <div className="flex justify-center gap-2 items-center">
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">Completed</p>
                  ) : (
                    <>
                      <img
                        onClick={() => handleCancel(item._id)}
                        className={`w-6 cursor-pointer transition-opacity ${
                          loadingId === item._id ? 'opacity-50 pointer-events-none' : ''
                        }`}
                        src={assets.cancel_icon}
                        alt="Cancel"
                        title="Cancel Appointment"
                      />
                      <img
                        onClick={() => handleComplete(item._id)}
                        className={`w-6 cursor-pointer transition-opacity ${
                          loadingId === item._id ? 'opacity-50 pointer-events-none' : ''
                        }`}
                        src={assets.tick_icon}
                        alt="Complete"
                        title="Mark as Completed"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
