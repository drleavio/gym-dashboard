import React,{useState} from 'react'
import withAuthProtection from '../controllers/withAuthProtection'
import axios from "axios"
import { useAuth } from '../store/useStore'
import { Link } from 'react-router-dom'

const Login = () => {

    const {formData, setFormData} =useAuth()
    
      const [error, setError] = useState("");
    
      const handleChange = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if((e.target.name==="email" || e.target.name==="phone") && emailRegex.test(e.target.value)){
            setFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }));
        }else if((e.target.name==="email" || e.target.name==="phone") && !emailRegex.test(e.target.value)){
        setFormData((prev) => ({
          ...prev,
          phone: e.target.value,
        }));
    }
    setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
    
        const { email, phone, password } = formData;
    
        if (!email || !phone || !password) {
          setError("All fields are required.");
          return;
        }
    
        setError("");
        try {
            const response=await axios.post("http://localhost:5732/api/auth/login",formData);
        
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
            type="email"
            name="email"
            value={formData.email || formData.phone}
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

export default withAuthProtection(Login)