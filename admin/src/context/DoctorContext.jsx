import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || "");
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dashData, setDashData] = useState(false);
    const [profileData, setProfileData] = useState(false);

    useEffect(() => {
        if (dToken) {
            localStorage.setItem('dToken', dToken);
        }
    }, [dToken]);

    const getAppointments = async () => {
        if (!dToken) {
            toast.error('No valid token found.');
            return;
        }

        try {
            setLoading(true);
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dToken } });
            if (data.success) {
                setAppointments([...data.appointments].reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const completeAppointment = async (appointmentId) => {
        if (!dToken) {
            toast.error('No valid token found.');
            return;
        }

        try {
            const { data } = await axios.post(
                backendUrl + '/api/doctor/complete-appointment',
                { appointmentId },
                { headers: { dToken } }
            );
            if (data.success) {
                toast.success(data.message);
                setAppointments(prevAppointments =>
                    prevAppointments.map(appointment =>
                        appointment._id === appointmentId ? { ...appointment, isCompleted: true } : appointment
                    )
                );
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'An error occurred.');
        }
    };

    const cancelAppointment = async (appointmentId) => {
        if (!dToken) {
            toast.error('No valid token found.');
            return;
        }

        try {
            const { data } = await axios.post(
                backendUrl + '/api/doctor/cancel-appointment',
                { appointmentId },
                { headers: { dToken } }
            );
            if (data.success) {
                toast.success(data.message);
                setAppointments(prevAppointments =>
                    prevAppointments.map(appointment =>
                        appointment._id === appointmentId ? { ...appointment, cancelled: true } : appointment
                    )
                );
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'An error occurred.');
        }
    };

    useEffect(() => {
        if (dToken) {
            getAppointments();
            getDashData();
        }
    }, [dToken]);

    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { dToken } });
            if (data.success) {
                setDashData(data.dashData);
                console.log('Dashboard Data:', data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log('Error fetching dashboard data:', error);
            toast.error(error?.response?.data?.message || error.message || 'An error occurred.');
        }
    };

    const getProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dToken } });
            if (data.success) {
                setProfileData(data.profileData);
                console.log(data.profileData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const updateProfileData = async (profile) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', profile, { headers: { dToken } });
            if (data.success) {
                toast.success(data.message);
                getProfileData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log('Update Profile Error:', error);
            toast.error(error?.response?.data?.message || error.message || 'An error occurred.');
        }
    };

    const value = {
        dToken,
        setDToken,
        backendUrl,
        appointments,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        loading,
        dashData,
        setDashData,
        getDashData,
        profileData,
        setProfileData,
        getProfileData,
        updateProfileData
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
