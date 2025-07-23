import React, { useEffect, useRef, useState } from 'react';

const OtpVerify = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

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
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');

    if (otpValue.length < 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }

    setError('');
    console.log('OTP Submitted:', otpValue);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">Verify OTP</h2>
        <p className="text-md font-semibold text-center text-gray-600 mb-6">Enter your 4 digit otp to verify</p>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
          <div className="flex space-x-4">
            {otp.map((digit, index) => (
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
