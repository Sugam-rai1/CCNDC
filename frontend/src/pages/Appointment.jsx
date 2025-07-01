import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/context';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData, userData } = useContext(AppContext);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    if (doctors?.length) {
      const docInfo = doctors.find((doc) => doc._id === docId);
      setDocInfo(docInfo);
    }
  };

  const getAvailableSlots = () => {
    setDocSlots([]);
    const today = new Date();
  
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
  
      const dayOfWeek = currentDate.getDay();
      // Skip Saturday (day 6)
      if (dayOfWeek === 6) continue;
  
      // Set start and end times for the day
      let startTime = new Date(currentDate);
      let endTime = new Date(currentDate);
      endTime.setHours(16, 0, 0, 0); // 4:00 PM
  
      // On the first day, start from the next valid time slot
      if (i === 0) {
        const now = new Date();
        if (now > endTime) continue; // Skip if the day is already over
  
        if (now.getHours() >= 9) {
          startTime.setHours(now.getHours(), now.getMinutes(), 0, 0);
          // Round up to the next 30-minute mark
          startTime.setMinutes(now.getMinutes() > 30 ? 0 : 30);
          startTime.setHours(startTime.getMinutes() === 0 ? startTime.getHours() + 1 : startTime.getHours());
        } else {
          startTime.setHours(9, 30, 0, 0); // Start at 9:30 AM
        }
      } else {
        startTime.setHours(9, 30, 0, 0); // Start at 9:30 AM for other days
      }
  
      let timeSlots = [];
  
      while (startTime < endTime) {
        let formattedTime = startTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
  
        let day = startTime.getDate();
        let month = startTime.getMonth() + 1;
        let year = startTime.getFullYear();
  
        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;
  
        const isSlotAvailable =
          !docInfo.slots_booked?.[slotDate]?.includes(slotTime);
  
        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(startTime),
            time: formattedTime,
          });
        }
  
        startTime.setMinutes(startTime.getMinutes() + 30);
      }
  
      if (timeSlots.length > 0) {
        setDocSlots((prev) => [...prev, timeSlots]);
      }
    }
  };
  
  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    if (!slotTime) {
      toast.warn("Please select a time slot");
      return;
    }

    if (!docInfo?.fee) {
      toast.error("Doctor's fee is not available.");
      console.log("Doctor's fee not available:", docInfo);
      return;
    }

    try {
      const date = docSlot[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      console.log("Booking payload", {
        userId: userData?._id,
        docId,
        slotDate,
        slotTime,
      });

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        {
          userId: userData?._id,
          docId,
          slotDate,
          slotTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Appointment booking error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    if (docInfo && !docInfo.fee) {
      toast.error("Doctor's fee is not available.");
    }
  }, [docInfo]);

  if (!docInfo) return <p>Loading doctor information...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-col sm:flex-row gap-8 p-4 sm:p-8 bg-white rounded-lg shadow-lg mx-auto mt-8 max-w-7xl">
        <div className="flex justify-center sm:justify-start w-full sm:w-1/3">
          <img
            className="bg-cyan-100 w-full h-full max-w-full rounded-lg shadow-lg object-cover"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 bg-white">
          <p className="flex items-center text-2xl font-semibold mb-4 text-gray-800">
            {docInfo.name}
            <img
              src={assets.verified_icon}
              alt="Verified Icon"
              className="ml-2 w-6 h-6"
            />
          </p>

          <div className="mb-6">
            <p className="text-lg text-gray-700">
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
              {docInfo.experience} years of experience
            </button>
          </div>

          <div>
            <p className="flex items-center text-xl font-medium mb-2 text-gray-800">
              About
              <img
                src={assets.info_icon}
                alt="Info Icon"
                className="ml-2 w-5 h-5"
              />
            </p>
            <p className="text-gray-700 leading-relaxed">{docInfo.about}</p>
          </div>

          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:{' '}
            <span className="text-gray-600">
              {currencySymbol}
              {docInfo.fee}
            </span>
          </p>
        </div>
      </div>

      <div className="sm:ml-7 sm:pl-4 mt-8 font-medium text-gray-700">
        <p className="text-lg font-semibold">Booking Slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlot.length > 0 &&
            docSlot.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-gray-900 text-white shadow-lg' : 'border border-white hover:bg-gray-200'
                  } transition-all duration-300`}
                key={index}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlot.length > 0 &&
            docSlot[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 border bg-gray-900 border-gray-300'
                  } transition duration-300`}
                key={index}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-gray-900 text-white text-sm font-light px-14 py-3 rounded-full my-6 border border-b-green-500 hover:bg-gray-800 hover:border-gray-600 transition duration-300"
        >
          Book an appointment
        </button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
