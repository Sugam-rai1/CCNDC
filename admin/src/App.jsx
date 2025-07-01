
import React, { useContext } from 'react';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllApointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import AddServicePage from './pages/Admin/AddServicePage';
import ManageAppointmentsPage from './pages/Admin/ManageAppointmentsPage';

// Doctor Pages
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {
  const { aToken, adminLogout } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const landingRoute = aToken
    ? '/admin-dashboard'
    : dToken
    ? '/doctor-dashboard'
    : '/';

  return (
    <>
      <ToastContainer />
      {aToken || dToken ? (
        <div className="bg-[#F8F9FD]">
          <Navbar logout={adminLogout} />
          <div className="flex items-start">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Navigate to={landingRoute} replace />} />

              {/* Admin Routes (only accessible if logged in as admin) */}
              {aToken ? (
                <>
                  <Route path="/admin-dashboard" element={<Dashboard />} />
                  <Route path="/all-appointments" element={<AllAppointments />} />
                  <Route path="/add-doctor" element={<AddDoctor />} />
                  <Route path="/doctors-list" element={<DoctorsList />} />
                  <Route path="/add-service" element={<AddServicePage />} />
                  <Route path="/manage-appointments" element={<ManageAppointmentsPage />} />
                </>
              ) : (
                // Redirect if not logged in as admin
                <>
                  <Route path="/admin-dashboard" element={<Navigate to="/" />} />
                  <Route path="/all-appointments" element={<Navigate to="/" />} />
                  <Route path="/add-doctor" element={<Navigate to="/" />} />
                  <Route path="/doctors-list" element={<Navigate to="/" />} />
                  <Route path="/add-service" element={<Navigate to="/" />} />
                  <Route path="/manage-appointments" element={<Navigate to="/" />} />
                </>
              )}

              {/* Doctor Routes */}
              {dToken ? (
                <>
                  <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                  <Route path="/doctor-appointments" element={<DoctorAppointments />} />
                  <Route path="/profile" element={<DoctorProfile />} />
                </>
              ) : (
                <>
                  <Route path="/doctor-dashboard" element={<Navigate to="/" />} />
                  <Route path="/doctor-appointments" element={<Navigate to="/" />} />
                  <Route path="/profile" element={<Navigate to="/" />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;