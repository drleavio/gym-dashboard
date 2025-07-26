import React, { useState } from 'react'
import axios from "axios"
import { useAuth } from '../store/useStore'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate=useNavigate()
    const { formData, setFormData } = useAuth()

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "contact") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^[0-9]{10}$/;

            if (emailRegex.test(value)) {
                setFormData((prev) => ({
                    ...prev,
                    email: value,
                    phone: "", 
                }));
            } else if (phoneRegex.test(value)) {
                setFormData((prev) => ({
                    ...prev,
                    phone: value,
                    email: "", 
                }));
            } else {
                console.log("Invalid contact: must be a valid email or 10-digit phone number");
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);


        try {
            const { email, phone, password } = formData;

            if ((!email && !phone) || !password) {
                setError("All fields are required.");
                return;
            }

            setError("");
            const response = await axios.post("http://localhost:5732/api/auth/login", formData);
            console.log(response);
            navigate("/otp-verify")

        } catch (error) {
            setError(error)
        }

    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

                {/* {error && <p className="text-red-500 text-sm mb-4">{error}</p>} */}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email or Phone</label>
                        <input
                            name="contact"
                            type="text"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="example@example.com or phone number"
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
                        onClick={(e)=>handleSubmit(e)}
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