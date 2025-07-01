import React, { useState, useContext } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) return toast.error('Please select an image');

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fee', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: {
          Authorization: `Bearer ${aToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        toast.success(data.message || 'Doctor added successfully!');
        // Reset form
        setDocImg(null);
        setName('');
        setEmail('');
        setPassword('');
        setExperience('1 Year');
        setFees('');
        setAbout('');
        setSpeciality('General Physician');
        setDegree('');
        setAddress1('');
        setAddress2('');
      } else {
        toast.error(data.message || 'Something went wrong');
        
      }

    } catch (error) {
      toast.error(error.response?.data?.message || 'Server Error');
      console.error('❌ Submission Error:', error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="px-6 py-8 max-w-5xl mx-auto" encType="multipart/form-data">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Add New Doctor</h2>

      <div className="bg-white rounded-xl shadow-lg border p-8 space-y-6">
        <div className="flex items-center gap-5">
          <label htmlFor="doc-img">
            <img
              className="w-20 h-20 object-cover rounded-full border-2 border-gray-300 hover:scale-105 transition-all cursor-pointer"
              src={
                docImg && typeof docImg === 'object'
                  ? URL.createObjectURL(docImg)
                  : assets.upload_area
              }
              alt="Upload Doctor"
            />
          </label>
          <input type="file" id="doc-img" hidden onChange={(e) => setDocImg(e.target.files[0])} />
          <p className="text-gray-600">Upload doctor <br /> profile photo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div className="space-y-4">
            <InputField label="Doctor Name" value={name} setValue={setName} />
            <InputField label="Email" type="email" value={email} setValue={setEmail} />
            <InputField label="Password" type="password" value={password} setValue={setPassword} />
            <DropdownField label="Experience" value={experience} setValue={setExperience} options={Array.from({ length: 10 }, (_, i) => `${i + 1} year${i > 0 ? 's' : ''}`)} />
            <InputField label="Consultation Fee (₹)" type="number" value={fees} setValue={setFees} />
          </div>

          <div className="space-y-4">
            <DropdownField label="Speciality" value={speciality} setValue={setSpeciality} options={[
              "General Physician", "Dermatologist", "Gynecologist", "Pediatricians", "Neurologist",
              "Gastroenterologist", "Radiologist", "Sonologist", "Pathologist", "Imaging Specialist", "Cardiologist"
            ]} />
            <InputField label="Education" value={degree} setValue={setDegree} />
            <InputField label="Address Line 1" value={address1} setValue={setAddress1} />
            <InputField label="Address Line 2" value={address2} setValue={setAddress2} />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">About Doctor</label>
            <textarea
              className="w-full border rounded-lg px-4 py-2 focus:outline-blue-400"
              rows={5}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Write a short bio about the doctor..."
              required
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all">
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

const InputField = ({ label, value, setValue, type = 'text' }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={label}
      className="w-full border rounded-lg px-4 py-2 focus:outline-blue-400"
      required
    />
  </div>
);

const DropdownField = ({ label, value, setValue, options }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full border rounded-lg px-4 py-2 focus:outline-blue-400"
      required
    >
      {options.map((option, i) => (
        <option key={i} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default AddDoctor;
