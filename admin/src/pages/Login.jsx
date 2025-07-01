import React, { useState, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password });
        if (data.success) {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{
        backgroundImage: "url('https://i.pinimg.com/originals/11/62/cb/1162cba28418a3eaa344dd62176ffa08.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm"></div>

      {/* Form Card */}
      <form onSubmit={onSubmitHandler} className="relative z-10 w-full max-w-md">
        <div className="flex flex-col gap-4 p-6 sm:p-8 bg-white bg-opacity-80 text-gray-800 rounded-xl shadow-xl">
          <h2 className="text-2xl font-semibold text-center">
            {state} <span className="text-gray-900">Login</span>
          </h2>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-900 transition"
          >
            Login
          </button>

          {/* Toggle */}
          <p className="text-sm text-center">
            {state === 'Admin' ? (
              <>
                Doctor Login?{' '}
                <span
                  className="underline cursor-pointer text-black"
                  onClick={() => setState('Doctor')}
                >
                  Click here
                </span>
              </>
            ) : (
              <>
                Admin Login?{' '}
                <span
                  className="underline cursor-pointer text-black"
                  onClick={() => setState('Admin')}
                >
                  Click here
                </span>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
