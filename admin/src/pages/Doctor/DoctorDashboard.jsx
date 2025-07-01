import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets'; // Assuming you have these assets
import { AppContext } from '../../context/AppContext';

const DoctorDashboard = () => {
  const { dToken, getDashData, dashData } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      {/* Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <StatCard
  title="Earnings"
  value={`₹${dashData.earnings}`}
  icon={assets.earning_icon} // You should have an appropriate icon for earnings
  gradient="from-purple-500 to-indigo-500"
/>

        <StatCard
          title="Appointments"
          value={dashData.appointments}
          icon={assets.appointments_icon}
          gradient="from-green-400 to-teal-500"
        />
        <StatCard
          title="Patients"
          value={dashData.patients}
          icon={assets.patients_icon}
          gradient="from-pink-500 to-red-400"
        />
      </div>

      {/* Latest Bookings */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <img src={assets.list_icon} alt="list" className="w-6 h-6" />
          <h2 className="text-lg font-semibold">Latest Appointments</h2>
        </div>
        <div className="divide-y">
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition"
            >
              <img
                className="w-12 h-12 object-cover rounded-full border"
                src={item.userData.image} // Assuming doctor has userData with image
                alt={item.userData.name} // Assuming userData has a name field
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">{item.userData.name}</p>
                <p className="text-xs text-gray-500">{slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <span className="text-xs font-semibold text-red-500 bg-red-100 px-2 py-1 rounded-full">Cancelled</span>
              ) : (
                <span className="text-xs font-semibold text-blue-500">Confirmed</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, gradient }) => (
  <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1`}>
    <div className={`px-5 py-4 bg-gradient-to-r ${gradient} text-white flex items-center justify-between`}>
      <p className="text-md font-medium">{title}</p>
      <img src={icon} alt={title} className="w-10 h-10" />
    </div>
    <div className="px-5 py-6 text-3xl font-bold text-gray-800">{value}</div>
  </div>
);

export default DoctorDashboard;
