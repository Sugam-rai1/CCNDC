import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"; // Match the port for the backend

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);
  
  const [ultrasounds, setUltrasounds] = useState([]);
  const [bloodTests, setBloodTests] = useState([]);

  // Sync token to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Get doctors list
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message || "Failed to fetch doctors");
      }
    } catch (error) {
      console.error("Doctors fetch error:", error);
      toast.error(error?.response?.data?.message || "Error fetching doctors");
    }
  };

  // Get user profile
  const loadUserProfileData = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        setUserData(null);
        toast.error(data.message || "Failed to load profile");
      }
    } catch (error) {
      console.error("User profile fetch error:", error);
      toast.error(error?.response?.data?.message || "Error fetching profile");
      setUserData(null);
    }
  };

  // Fetch Ultrasounds Data
  const getUltrasoundsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/ultrasound/list`);
      if (data.success) {
        setUltrasounds(data.ultrasounds);
      } else {
        toast.error(data.message || "Failed to fetch ultrasounds");
      }
    } catch (error) {
      console.error("Ultrasounds fetch error:", error);
      toast.error(error?.response?.data?.message || "Error fetching ultrasounds");
    }
  };

  // Fetch Blood Tests Data
  const getBloodTestsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/bloodtest/list`);
      if (data.success) {
        setBloodTests(data.bloodTests);
      } else {
        toast.error(data.message || "Failed to fetch blood tests");
      }
    } catch (error) {
      console.error("Blood tests fetch error:", error);
      toast.error(error?.response?.data?.message || "Error fetching blood tests");
    }
  };

  // On mount: fetch doctors, ultrasounds, and blood tests
  useEffect(() => {
    getDoctorsData();
    getUltrasoundsData();
    getBloodTestsData();
  }, []);

  // On token change: load user profile
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null);
    }
  }, [token]);

  const value = {
    doctors,
    getDoctorsData,
    setDoctors,
    ultrasounds,
    getUltrasoundsData,
    setUltrasounds,
    bloodTests,
    getBloodTestsData,
    setBloodTests,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
