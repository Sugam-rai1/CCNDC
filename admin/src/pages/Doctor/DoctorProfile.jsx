import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, updateProfileData } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
      setIsAvailable(profileData.available || false);
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET');  // Use your Cloudinary upload preset here

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dmeibksu1/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setFormData((prev) => ({ ...prev, image: data.secure_url }));
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    const updatedData = {
      ...formData,
      available: isAvailable,
      docId: profileData._id,
    };
    await updateProfileData(updatedData);
    setIsEdit(false);
  };

  const defaultImage = 'https://via.placeholder.com/150?text=No+Image';

  if (!profileData) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 relative">
          {isEdit ? (
            <label htmlFor="image">
              <div className="relative w-40 h-40">
                <img
                  className="w-40 h-40 object-cover rounded-full border-4 border-blue-200 shadow-md"
                  src={imageFile ? URL.createObjectURL(imageFile) : formData.image || defaultImage}
                  alt="Doctor"
                />
              </div>
              <input
                onChange={handleImageUpload}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              className="w-40 h-40 object-cover rounded-full border-4 border-blue-200 shadow-md"
              src={formData.image || defaultImage}
              alt="Doctor"
            />
          )}
          {isUploading && <div className="text-blue-600 text-sm mt-2">Uploading...</div>}
        </div>

        <div className="flex-1">
          {isEdit ? (
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="text-xl font-semibold text-gray-800 border p-1 rounded w-full"
            />
          ) : (
            <h2 className="text-2xl font-semibold text-gray-800">{formData.name}</h2>
          )}

          <p className="text-gray-600 mb-2">
            {isEdit ? (
              <>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree || ''}
                  onChange={handleChange}
                  className="border p-1 rounded mr-2"
                />
                <input
                  type="text"
                  name="speciality"
                  value={formData.speciality || ''}
                  onChange={handleChange}
                  className="border p-1 rounded"
                />
              </>
            ) : (
              `${formData.degree} - ${formData.speciality}`
            )}
          </p>

          <button className="px-4 py-1 text-sm bg-blue-100 text-blue-700 rounded-full mb-4">
            {formData.experience} Years Experience
          </button>

          <div className="mb-4">
            <p className="font-semibold text-gray-700">About:</p>
            {isEdit ? (
              <textarea
                name="about"
                value={formData.about || ''}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            ) : (
              <p className="text-gray-600">{formData.about}</p>
            )}
          </div>

          <p className="text-gray-700 font-medium">
            Appointment Fee:{' '}
            {isEdit ? (
              <input
                type="number"
                name="fee"
                value={formData.fee || ''}
                onChange={handleChange}
                className="ml-2 w-20 border p-1 rounded"
              />
            ) : (
              <span className="text-blue-600">
                {currency} {formData.fee}
              </span>
            )}
          </p>

          <div className="mt-4">
            <p className="font-semibold text-gray-700">Address:</p>
            {isEdit ? (
              <>
                <input
                  type="text"
                  name="address.line1"
                  value={formData.address?.line1 || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className="w-full border p-1 rounded mb-2"
                />
                <input
                  type="text"
                  name="address.line2"
                  value={formData.address?.line2 || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className="w-full border p-1 rounded"
                />
              </>
            ) : (
              <p className="text-gray-600">
                {formData.address?.line1}
                <br />
                {formData.address?.line2}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label htmlFor="available" className="text-gray-700 font-medium">
            Available:
          </label>
          <input
            type="checkbox"
            id="available"
            checked={isAvailable}
            onChange={() => setIsAvailable((prev) => !prev)}
            className="w-5 h-5 accent-blue-500 rounded"
          />
        </div>
        {isEdit ? (
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md"
            disabled={isUploading}
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
