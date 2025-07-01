import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';


const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const url = `${backendUrl}/api/user/${state === 'Sign Up' ? 'register' : 'login'}`;
      const payload = state === 'Sign Up' ? { name, email, password } : { email, password };
      const { data } = await axios.post(url, payload);

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🔹 Google Login Handler
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const { data } = await axios.post(`${backendUrl}/api/user/google-login`, { token });

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success('Logged in with Google');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{
          backgroundImage:
            "url('https://media.tripinvites.com/places/namchi/the-char-dham-featured.jpg')",
          maskImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
        }}
      ></div>

      <form
        onSubmit={onSubmitHandler}
        className="relative z-10 w-full max-w-md p-6 sm:p-8 bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-xl"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-white">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className="text-sm text-gray-200 mb-6">
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment.
        </p>

        {state === 'Sign Up' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-transparent text-white placeholder-gray-300"
              placeholder="Enter your name"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-transparent text-white placeholder-gray-300"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-transparent text-white placeholder-gray-300"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white bg-black bg-opacity-80 rounded-md text-base hover:bg-opacity-100 transition"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Log In'}
        </button>

        {/* 🔹 Google Sign In */}
        {state === 'Login' && (
          <div className="mt-6 text-center">
            <p className="text-white mb-2">OR</p>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error('Google Login Failed')}
              width="100%"
            />
          </div>
        )}

        <p className="mt-4 text-sm text-center text-white">
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="text-white underline cursor-pointer"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Create a new account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className="text-white underline cursor-pointer"
              >
                Click here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
