import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className="px-6 py-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      {/* Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Doctors"
          value={dashData.doctors}
          icon={assets.doctor_icon}
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
      <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-6">
        <div className="flex items-center gap-3 px-6 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <img src={assets.list_icon} alt="list" className="w-6 h-6" />
          <h2 className="text-lg font-semibold">Latest Bookings</h2>
        </div>
        <div className="divide-y">
          {dashData.lastestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition"
            >
              <img
                className="w-12 h-12 object-cover rounded-full border"
                src={item.docData.image}
                alt={item.docData.name}
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">{item.docData.name}</p>
                <p className="text-xs text-gray-500">{slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <img
                  onClick={() => handleDelete(item._id)}
                  className="w-6 md:w-8 cursor-pointer mx-auto"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ title, value, icon, gradient }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform hover:-translate-y-2">
    <div className={`px-5 py-4 bg-gradient-to-r ${gradient} text-white flex items-center justify-between`}>
      <p className="text-md font-medium text-white">{title}</p>
      <img src={icon} alt={title} className="w-12 h-12 rounded-full shadow-md" />
    </div>
    <div className="px-5 py-6 text-3xl font-bold text-gray-800">{value}</div>
  </div>
)

export default Dashboard
