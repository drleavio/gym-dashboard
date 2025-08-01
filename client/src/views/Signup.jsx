import React, { useState } from "react";
import { useAuth } from '../store/useStore';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

const Signup = () => {
  const {formData, setFormData} = useAuth()
  const navigat=useNavigate()

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

   
    try {
        const { email, phone, password } = formData;

        if (!email || !phone || !password) {
          setError("All fields are required.");
          return;
        }
    
        setError("");
        console.log("Form Data:", formData);
        const response=await axios.post("http://localhost:5732/api/auth/signup",formData)
        console.log(response);
        if(!response.data.success){
            setError(response.data.msg)
            return
        }
        setFormData({
            ...formData,
            email:"",
            phone:"",
            password:""
        })
        navigat("/login")

        
    } catch (error) {
        setError(error)
    }
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Signup</h2>

        {/* {error && <p className="text-red-500 text-sm mb-4">{error}</p>} */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="example@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter a secure password"
            />
          </div>
            {
                error && <div className="w-full bg-red-200 text-center text-red-600 py-2 rounded-md hover:bg-blue-700 transition duration-200">{error}</div>
            }
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Signup
          </button>
          <p className='text-center'>Already have an account? please <Link className='text-blue-500' to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup