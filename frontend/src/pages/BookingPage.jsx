import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/context';

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, backendUrl } = useContext(AppContext);
  const selectedTest = location.state?.selectedTest;

  const [date, setDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Pay at clinic');
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const isSaturday = (date) => {
    const day = new Date(date).getDay();
    return day === 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !selectedTest?._id) {
      toast.error('Please select a valid date and test');
      return;
    }

    let testType = selectedTest?.testType;
    if (!testType) {
      if (selectedTest?.description?.toLowerCase().includes('blood')) {
        testType = 'Blood Test';
      } else {
        testType = 'Ultrasound';
      }
    }

    if (isSaturday(date)) {
      toast.error('Bookings cannot be made on Saturdays.');
      return;
    }

    if (!token) {
      toast.warn('Login to book appointment');
      navigate('/login');
      return;
    }

    // ⏱ Time restriction logic
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (testType === 'Ultrasound') {
      if (
        currentHour < 9 ||
        (currentHour === 9 && currentMinute < 30) ||
        currentHour >= 16
      ) {
        toast.error('Ultrasound bookings are allowed between 9:30 AM and 4:00 PM.');
        return;
      }
    }

    if (testType === 'Blood Test') {
      if (currentHour < 8 || currentHour >= 18) {
        toast.error('Blood Test bookings are allowed between 8:00 AM and 6:00 PM.');
        return;
      }
    }

    if (paymentMethod === 'Online') {
      toast.error('Online payment is not available. Please select "Pay at clinic".');
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        date,
        testId: selectedTest._id,
        testType,
        paymentMethod,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-test-appointment`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success('Booking successful!');
        navigate('/my-test-appointments');
      } else {
        toast.error(data.message || 'Failed to create booking');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Failed to create booking');
      } else {
        toast.error('Failed to create booking');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Book Appointment for</h2>

        <div className="text-center mb-6">
          <h3 className="text-xl font-bold">{selectedTest.name}</h3>
          <p className="text-green-600 font-semibold">Price: ₹{selectedTest.price}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Select Date:</label>
            <input 
              type="date" 
              className="w-full border border-gray-300 rounded p-2"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            {isSaturday(date) && (
              <p className="text-red-500 text-sm">Saturday is closed for appointments.</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Payment Method:</label>
            <select
              className="w-full border border-gray-300 rounded p-2"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="Pay at clinic">Pay at clinic</option>
              <option value="Online">Online</option>
            </select>
          </div>

          <div className="text-center">
            <button 
              type="submit"
              className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
