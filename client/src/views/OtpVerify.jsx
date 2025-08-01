import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../store/useStore';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const OtpVerify = () => {
  const inputRefs = useRef([]);
  const {formData, setFormData,setTokenState} = useAuth()
  const [error, setError] = useState('');
  const navigate=useNavigate()

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...formData.otp];
    updatedOtp[index] = value;
    setFormData({
        ...formData,
        otp:updatedOtp
    });

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };
  const [time, setTime] = useState(60);
const timerRef = useRef(null); 

const sendOtp = async () => {
  setTime(60); 
  if (timerRef.current) {
    clearInterval(timerRef.current);
  }

  timerRef.current = setInterval(() => {
    setTime((prev) => {
      if (prev <= 1) {
        clearInterval(timerRef.current);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
};

const formatTime = (time) => {
    const seconds = time % 60;
    return `${String(seconds).padStart(2, '0')}`;
  };

useEffect(() => {
    if(time>=1){
        sendOtp()
    }
    return () => clearInterval(timerRef.current);
  }, []);

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = formData.otp.join(''); // assuming formData.otp is array of digits
  
    if (otpValue.length < 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5732/api/auth/verify-otp", {
        identifier: formData.email || formData.phone,
        otp: otpValue
      });
      console.log(response.data);
      setTokenState(response.data.token)
     setFormData({
        ...formData,
        email:"",
        phone:"",
        password:"",
        otp:['','','','']
     })
     navigate("/dashboard")

  
    } catch (error) {
      setError(error.response?.data?.message || error.message || "OTP verification failed");
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">Verify OTP</h2>
        <p className="text-md font-semibold text-center text-gray-600 mb-6">Enter your 4 digit otp to verify</p>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
          <div className="flex space-x-4">
            {formData.otp?.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Verify
          </button>
          {
            time===0? <button onClick={()=>sendOtp()}>send otp</button>:<p>sent otp again after {formatTime(time)} sec</p>
          }
        </form>
      </div>
    </div>
  );
};

export default OtpVerify;
