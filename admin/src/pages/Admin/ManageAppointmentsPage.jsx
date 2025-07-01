import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const aToken = localStorage.getItem('aToken');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/admin/test-bookings`, {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });

      if (res.data.success) {
        const updatedAppointments = res.data.bookings.map((app) => {
          if (!app.userId) {
            app.userId = { _id: null, name: 'N/A' }; // Fallback for missing userId
          }
          return app;
        });
        setAppointments(updatedAppointments);
      } else {
        toast.error('Failed to fetch test bookings');
      }
    } catch (error) {
      toast.error('Error loading test bookings');
      console.error('Fetch error:', error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointment) => {
    console.log('Canceling appointment:', appointment);

    if (!appointment || !appointment._id) {
      console.error('Invalid appointment object:', appointment);
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/admin/cancel-test-booking`,
        { appointmentId: appointment._id },
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (res.data.success) {
        toast.success('Appointment cancelled successfully');
        fetchAppointments(); // Refresh the list after cancellation
      } else {
        toast.error(res.data.message || 'Failed to cancel the appointment');
      }
    } catch (err) {
      console.error('Cancel error:', err.response?.data || err.message);
      toast.error('Failed to cancel the appointment. Please try again.');
    }
  };

  const markAsCompleted = async (appointmentId, userId) => {
    if (!userId) {
      toast.error('User ID missing. Cannot mark appointment as completed.');
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/admin/complete-appointment`,
        { appointmentId, userId },
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (res.data.success) {
        toast.success('Appointment marked as completed');
        fetchAppointments();
      } else {
        toast.error(res.data.message || 'Failed to mark appointment as completed');
      }
    } catch (error) {
      console.error('Mark complete error:', error.response?.data || error.message);
      toast.error('Error marking appointment as completed');
    }
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-semibold mb-6">Manage Test Appointments</h1>

      {/* Table Container with Horizontal Scrolling on Mobile */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 text-xs sm:text-sm text-left">Patient</th>
              <th className="py-3 px-4 text-xs sm:text-sm text-left">Test</th>
              <th className="py-3 px-4 text-xs sm:text-sm text-left">Date</th>
              <th className="py-3 px-4 text-xs sm:text-sm text-left">Status</th>
              <th className="py-3 px-4 text-xs sm:text-sm text-left">Completed</th>
              <th className="py-3 px-4 text-xs sm:text-sm text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  <span className="spinner-border"></span> Loading appointments...
                </td>
              </tr>
            ) : appointments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No Appointments Found
                </td>
              </tr>
            ) : (
              appointments.map((app) => (
                <tr key={app._id} className="border-t text-sm">
                  <td className="py-3 px-4">{app.userId?.name || 'N/A'}</td>
                  <td className="py-3 px-4">{`${app.testType}: ${app.testId?.name || 'Test'}`}</td>
                  <td className="py-3 px-4">
                    {app.date ? new Date(app.date).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    {app.cancelled ? (
                      <span className="text-red-500 font-semibold">Cancelled</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Active</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {app.isCompleted ? (
                      <span className="text-blue-600 font-semibold">Completed</span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    {!app.cancelled && !app.isCompleted ? (
                      <>
                        {/* Cancel Button */}
                        <button
                          onClick={() => cancelAppointment(app)}
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-xs sm:text-sm"
                        >
                          Cancel
                        </button>

                        {/* Mark as Completed Button */}
                        <button
                          onClick={() => {
                            if (!app.userId || !app.userId._id) {
                              toast.error('User ID missing. Cannot mark as completed.');
                              return;
                            }
                            markAsCompleted(app._id, app.userId._id);
                          }}
                          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 text-xs sm:text-sm"
                        >
                          Mark as Completed
                        </button>
                      </>
                    ) : (
                      <span className="bg-gray-300 text-gray-600 py-1 px-3 rounded inline-block text-xs sm:text-sm">
                        {app.cancelled ? 'Cancelled' : 'Completed'}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View: Card Layout */}
      <div className="block lg:hidden mt-6">
        {appointments.map((app) => (
          <div key={app._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold">{app.userId?.name || 'N/A'}</h3>
            <p className="text-sm text-gray-500">{app.testType}: {app.testId?.name || 'Test'}</p>
            <p className="text-sm text-gray-500">Date: {app.date ? new Date(app.date).toLocaleDateString() : 'N/A'}</p>
            <p className={`text-sm ${app.cancelled ? 'text-red-500' : 'text-green-600'} font-semibold`}>
              {app.cancelled ? 'Cancelled' : 'Active'}
            </p>
            <p className={`text-sm ${app.isCompleted ? 'text-blue-600' : 'text-yellow-600'} font-semibold`}>
              {app.isCompleted ? 'Completed' : 'Pending'}
            </p>
            <div className="space-x-2 mt-4">
              {!app.cancelled && !app.isCompleted ? (
                <>
                  <button
                    onClick={() => cancelAppointment(app)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!app.userId || !app.userId._id) {
                        toast.error('User ID missing. Cannot mark as completed.');
                        return;
                      }
                      markAsCompleted(app._id, app.userId._id);
                    }}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 text-xs"
                  >
                    Mark as Completed
                  </button>
                </>
              ) : (
                <span className="bg-gray-300 text-gray-600 py-1 px-3 rounded inline-block text-xs">
                  {app.cancelled ? 'Cancelled' : 'Completed'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAppointmentsPage;
