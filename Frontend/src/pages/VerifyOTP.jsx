import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '/src/assets/logo.jpg';

export default function VerifyOTP() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpError, setOtpError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const location = useLocation();

  useEffect(() => {
    const fetchEmailVerification = async () => {
      const emailParam = new URLSearchParams(location.search).get('email');
      if (emailParam) {
        setEmail(emailParam);
        try {
          const response = await axios.post(`${apiUrl}/verify-email`, { email: emailParam });
          if (response.data.message) {
            setIsEmailVerified(true);
          } else {
            setOtpError('Email verification failed. Please try again.');
          }
        } catch (error) {
          // Error handling remains the same
        }
      } else {
        setOtpError('No email provided for verification.');
      }
    };

    fetchEmailVerification();
  }, [location.search, apiUrl]);

  const handleChange = (element, index) => {
    let newOtp = [...otp];

    if (/^[0-9]$/.test(element.value) || element.value === "") {
      newOtp[index] = element.value;
      setOtp(newOtp);

      if (element.value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }

      if (element.value === "" && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
      setOtpError("");
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.join("").length !== 6) {
      setOtpError('Please enter a 6-digit OTP.');
      return;
    }

    try {
      await axios.post(`${apiUrl}/verify-email`, { email, otp: otp.join("") });
      setIsVerified(true);
      toast.success('OTP verified successfully', { autoClose: 2000 });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center justify-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#14496b]">Verify OTP</h2>
        </div>
        {isVerified ? (
          <div className="text-center text-green-500">
            <p className="text-lg">OTP verified successfully!</p>
            <Link to="/login" className="text-[#125872] mt-4 block text-base hover:underline">Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6 flex justify-between">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={otp[index]}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="border border-gray-400 w-10 h-10 sm:w-12 sm:h-12 text-center text-gray-700 leading-tight focus:outline-none focus:border-[#125872] text-lg sm:text-xl"
                  required
                />
              ))}
            </div>
            {otpError && (
              <p className="text-red-500 text-sm mt-2 text-center mb-4">{otpError}</p>
            )}
            <div className="flex items-center justify-center mb-4">
              <button
                type="submit"
                className="bg-[#125872] text-white font-bold w-full py-3 px-4 rounded-md hover:bg-[#0E4E63] transition duration-300"
              >
                Verify OTP
              </button>
            </div>
            <div className="flex justify-center">
              <Link to="/register" className="text-[#125872] text-sm hover:underline">
                Want to change email?
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}