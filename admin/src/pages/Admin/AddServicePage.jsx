import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext"; // Ensure this is the correct path

const AddServicePage = () => {
  const { aToken } = useContext(AdminContext); // Get aToken from AdminContext
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [serviceType, setServiceType] = useState('ultrasound');
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const token = aToken || localStorage.getItem('aToken');
      if (!token) {
        console.error('No admin token found');
        toast.error('No admin token found');
        return;
      }
  
      const endpoint = serviceType === 'ultrasound' ? '/api/admin/ultrasounds' : '/api/admin/blood-tests';
      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log('Fetched services:', response.data); // Log the response to debug
  
      if (response.data.success) {
        if (serviceType === 'ultrasound' && Array.isArray(response.data.ultrasounds)) {
          setServices(response.data.ultrasounds);
        } else if (serviceType === 'bloodtest' && Array.isArray(response.data.bloodTests)) {
          setServices(response.data.bloodTests);
        } else {
          console.error('Unexpected response format:', response.data);
          toast.error('Failed to fetch services');
        }
      } else {
        toast.error('Failed to fetch services');
      }
    } catch (error) {
      toast.error('Error fetching services');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchServices();
  }, [serviceType, aToken]); // Re-fetch services when serviceType or aToken changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    if (!serviceName || !price || !description) {
      toast.error('Please fill all fields');
      return;
    }

    const serviceData = {
      name: serviceName,
      price,
      description,
    };

    try {
      const token = aToken || localStorage.getItem('aToken');
      if (!token) {
        console.error('No admin token found');
        toast.error('No admin token found');
        return;
      }

      // Determine the correct endpoint and method
      let endpoint;
      let method;

      if (selectedService) {
        // Update existing service (PUT request)
        console.log('Updating service with ID:', selectedService._id);
        endpoint = serviceType === 'ultrasound'
  ? `/api/admin/update-ultrasound/${selectedService._id}`
  : `/api/admin/update-blood-test/${selectedService._id}`;

        method = 'put';
      } else {
        // Add new service (POST request)
        console.log('Adding new service');
        endpoint = serviceType === 'ultrasound'
          ? '/api/admin/add-ultrasound'
          : '/api/admin/add-blood-test';
        method = 'post';
      }

      // Log endpoint and method for debugging
      console.log('Request Method:', method);
      console.log('Endpoint:', endpoint);

      // Make the API call to add or update the service
      await axios[method](endpoint, serviceData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`${selectedService ? 'Service updated' : 'Service added'} successfully`);

      // Re-fetch the services list after adding or updating
      fetchServices();

      // Reset the form
      resetForm();

    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast.error('Failed to add or update service');
    }
  };

  const handleEdit = (service) => {
    setServiceName(service.name);
    setPrice(service.price);
    setDescription(service.description);
    setSelectedService(service);
  };

  const handleDelete = async (serviceId) => {
    try {
      const token = aToken || localStorage.getItem('aToken');
      if (!token) {
        console.error('No admin token found');
        toast.error('No admin token found');
        return;
      }

      await axios.delete(`/api/admin/delete-${serviceType}/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Service deleted successfully');
      fetchServices();
    } catch (error) {
      toast.error('Failed to delete service');
      console.error(error);
    }
  };

  const resetForm = () => {
    setServiceName('');
    setPrice('');
    setDescription('');
    setSelectedService(null);
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-semibold mb-6">Add/Edit {serviceType === 'ultrasound' ? 'Ultrasound' : 'Blood Test'} Service</h1>

      {/* Service Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Service Name</label>
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="w-full border p-2 rounded-md"
            placeholder="Enter service name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 rounded-md"
            placeholder="Enter price"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded-md"
            placeholder="Enter description"
            rows="4"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Service Type</label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full border p-2 rounded-md"
          >
            <option value="ultrasound">Ultrasound</option>
            <option value="bloodtest">Blood Test</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-slate-900 hover:bg-slate-700 text-white py-2 px-4 rounded-md transition"
        >
          {selectedService ? 'Update Service' : 'Add Service'}
        </button>
      </form>

      {/* Existing Services */}
      <h2 className="text-xl font-semibold mb-4">Existing {serviceType === 'ultrasound' ? 'Ultrasound' : 'Blood Test'} Services</h2>
      <div className="space-y-4">
        {services.length === 0 ? (
          <p>No services available. Please add a service.</p>
        ) : (
          services.map((service) => (
            <div key={service._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg">{service.name}</h3>
              <p className="text-gray-700">{service.description}</p>
              <p className="font-semibold">Price: ₹{service.price}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleEdit(service)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddServicePage;
