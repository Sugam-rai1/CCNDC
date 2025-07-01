import React, { useContext, useState } from 'react';
import { AppContext } from '../context/context';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) formData.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        toast.success(data.message || "Profile updated successfully!");
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "An error occurred");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dmeibksu1/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setUserData(prev => ({ ...prev, image: data.secure_url }));
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return userData && (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10 mb-40 space-y-8">

      <div className="flex flex-col md:flex-row md:items-center gap-8">
        <div className="flex-shrink-0">
          {isEdit ? (
            <label htmlFor="image">
              <div className="relative w-40 h-40">
                <img
                  className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-xl hover:opacity-90 transition cursor-pointer"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="User"
                />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-xl"
              src={userData.image}
              alt="Profile"
            />
          )}
        </div>

        <div className="flex-grow text-center md:text-left">
          {isEdit ? (
            <input
              className="text-3xl font-bold border-b-2 border-gray-300 focus:outline-none focus:border-black w-full"
              type="text"
              value={userData.name}
              onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
            />
          ) : (
            <h2 className="text-4xl font-bold text-neutral-900">{userData.name}</h2>
          )}
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      <div className="space-y-6 text-gray-800">
        <h3 className="text-2xl font-semibold border-l-4 border-black pl-2">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4">
          <span className="font-semibold">Email:</span>
          <span className="text-cyan-800 break-words">{userData.email}</span>

          <span className="font-semibold">Phone:</span>
          {isEdit ? (
  <input
    className="bg-gray-100 px-3 py-2 border border-gray-300 rounded-md w-full"
    type="text"
    value={userData.phone}
    onChange={e => {
      // Ensure the phone number starts with 91+
      let value = e.target.value;
      if (value.startsWith('91+')) {
        value = '91+' + value.slice(3); // Ensure it's not more than 11 digits
      }

      if (value.length <= 13) {
        setUserData(prev => ({ ...prev, phone: value }));
      }
    }}
    placeholder="91+xxxxxxxxxx"
  />
) : (
  <span className="text-cyan-800">{userData.phone}</span>
)}

          <span className="font-semibold">Gender:</span>
          {isEdit ? (
            <select
              className="bg-gray-100 px-3 py-2 border border-gray-300 rounded-md w-full"
              value={userData.gender}
              onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <span className="text-cyan-800">{userData.gender}</span>
          )}

          <span className="font-semibold">DOB:</span>
          {isEdit ? (
            <input
              className="bg-gray-100 px-3 py-2 border border-gray-300 rounded-md w-full"
              type="date"
              value={userData.dob}
              onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
            />
          ) : (
            <span className="text-cyan-800">{userData.dob}</span>
          )}

          <span className="font-semibold">Address:</span>
          {isEdit ? (
            <div className="flex flex-col gap-2 w-full">
              <input
                className="bg-gray-100 px-3 py-2 border border-gray-300 rounded-md w-full"
                type="text"
                value={userData.address?.line1 || ''}
                onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
              />
              <input
                className="bg-gray-100 px-3 py-2 border border-gray-300 rounded-md w-full"
                type="text"
                value={userData.address?.line2 || ''}
                onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
              />
            </div>
          ) : (
            <span className="text-gray-700 whitespace-pre-line">
            {userData.address?.line1 && <div>{userData.address.line1}</div>}
            {userData.address?.line2 && <div>{userData.address.line2}</div>}
          </span>
          
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-4 justify-end">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all"
          >
            Save Info
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="border border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all"
          >
            Edit Profile
          </button>
        )}
      </div>

      {isEdit && (
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-800">Upload new profile picture:</p>
          {!isUploading ? (
            <input
              type="file"
              onChange={handleImageUpload}
              className="mt-2 text-sm"
            />
          ) : (
            <div className="text-blue-600 mt-2 animate-pulse">Uploading...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProfile;