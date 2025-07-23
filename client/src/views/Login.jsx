import React,{useState} from 'react'
import withAuthProtection from '../controllers/withAuthProtection'
import axios from "axios"
import { useAuth } from '../store/useStore'
import { Link } from 'react-router-dom'

const Login = () => {

    const {formData, setFormData} =useAuth()
    
      const [error, setError] = useState("");
    
      const handleChange = (e) => {
        const { name, value } = e.target;
      
        if (name === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            // Optional: show email validation error here
            console.log("Invalid email");
          }
        }
      
        if (name === "phone") {
          const phoneRegex = /^[0-9]{10}$/; // Optional: 10 digit number validation
          if (!phoneRegex.test(value)) {
            console.log("Invalid phone number");
          }
        }
      
        // Update the form data regardless
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      
    
      const handleSubmit = async(e) => {
        e.preventDefault();
    console.log(formData);
    
       
        try {
            const { email, phone, password } = formData;
    
            if ((!email && !phone )|| !password) {
              setError("All fields are required.");
              return;
            }
        
            setError("");
            const response=await axios.post("http://localhost:5732/api/auth/login",formData);
            console.log(response);
            
        
        } catch (error) {
            
        }
       
      };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email or Phone</label>
          <input
            name={formData.email || formData.phone}
            type="text"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="example@example.com"
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
        <p className='text-center'>Don't have an account? please <Link className='text-blue-500' to="/">Signup</Link></p>
      </form>
    </div>
  </div>
  )
}

export default Login