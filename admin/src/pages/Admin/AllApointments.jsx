import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)
  const [loadingId, setLoadingId] = useState(null)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  const handleDelete = async (appointmentId) => {
    if (!appointmentId) return console.warn('⚠️ Missing appointment ID')

    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        setLoadingId(appointmentId)
        await cancelAppointment(appointmentId)
      } catch (error) {
        console.error('❌ Error deleting appointment:', error)
      } finally {
        setLoadingId(null)
      }
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto my-6 px-4">
      <p className="mb-4 text-2xl font-semibold text-gray-800">All Appointments</p>

      <div className="bg-white border rounded-lg shadow-md text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto">
        {/* Desktop Table Header */}
        <div className="hidden md:grid grid-cols-[40px_1.5fr_0.7fr_1.5fr_1.5fr_0.7fr_1fr] py-3 px-6 border-b bg-gray-100 font-semibold text-gray-700 text-center">
          <p>#</p>
          <p className="text-left">Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointment Rows */}
        {appointments.map((item, index) => (
          <div
            key={item._id || index}
            className="border-b text-gray-700 hover:bg-gray-50 text-sm"
          >
            {/* Desktop Row */}
            <div className="hidden md:grid grid-cols-[40px_1.5fr_0.7fr_1.5fr_1.5fr_0.7fr_1fr] items-center py-4 px-6 text-center">
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
              <div className="flex items-center justify-center gap-2">
                <img
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  src={item.docData?.image || `https://ui-avatars.com/api/?name=${item.docData?.name || 'Doctor'}`}
                  alt={item.docData?.name || 'Doctor'}
                />
                <p className="truncate">{item.docData?.name || '—'}</p>
              </div>
              <p>{currency}{item.amount}</p>
              {
                item.cancelled
                  ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  : item.isCompleted ? <p className='text-green-500 text-xs font-medium' >Completed</p> : <img
                      onClick={() => handleDelete(item._id)}
                      className="w-6 md:w-8 cursor-pointer mx-auto"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
              }
            </div>

            {/* Mobile Card Style */}
            <div className="md:hidden p-4">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={item.userData?.image || `https://ui-avatars.com/api/?name=${item.userData?.name}`}
                  alt={item.userData?.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                />
                <div>
                  <p className="font-semibold text-base">{item.userData?.name}</p>
                  <p className="text-xs text-gray-500">Age: {calculateAge(item.userData?.dob)}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-600">📅 {slotDateFormat(item.slotDate)}</p>
                <p className="text-sm text-gray-600">🕒 {item.slotTime}</p>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <img
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  src={item.docData?.image || `https://ui-avatars.com/api/?name=${item.docData?.name || 'Doctor'}`}
                  alt={item.docData?.name || 'Doctor'}
                />
                <p className="text-sm font-medium">{item.docData?.name || '—'}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-700">💵 {currency}{item.amount}</p>
                {
                  item.cancelled
                    ? <p className='text-red-500 text-sm font-semibold'>Cancelled</p>
                    : <img
                        onClick={() => handleDelete(item._id)}
                        className="w-6 cursor-pointer"
                        src={assets.cancel_icon}
                        alt="Cancel"
                      />
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
