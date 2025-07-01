import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Import pages (ensure these paths are correct)
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import Appointment from './pages/Appointment';
import MyAppointments from './pages/MyAppointments';
import UltrasoundPage from './pages/UltrasoundPage';
import BloodTestPage from './pages/BloodTestPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingPage from './pages/BookingPage';
import MyTestAppointments from './pages/MyTestAppointments';

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        
        {/* New Routes */}
        <Route path="/tests/ultrasound" element={<UltrasoundPage />} />  {/* Ultrasound Page Route */}
        <Route path="/tests/blood" element={<BloodTestPage />} />        {/* Blood Test Page Route */}
        <Route path="/book-test-appointment" element={<BookingPage/>} /> 
        <Route path="/my-test-appointments" element={<MyTestAppointments />} />
        <Route path="/tests/appointment" element={<MyTestAppointments />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
