import React, { useState, useEffect } from 'react';
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
          // console.error('Error verifying email:', error);
          // setOtpError('Error verifying email. Please try again.');
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
    <div className="bg-[#f5f5f5] min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <Link to="/">
            <img className="h-12" src={Logo} alt="Logo" />
          </Link>
          <Link to="/" className="md:block hidden text-xl md:text-3xl font-bold ml-1 font-PlayFair">
            <span className="text-[#14496b]">Medi</span>
            <span className="text-[#8ccf28]">Mart</span>
          </Link>
        </div>
        {isVerified ? (
          <div className="text-center text-green-500">
            <p>OTP verified successfully!</p>
            <Link to="/login" className="text-[#125872] mt-4 block">Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex justify-between">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={otp[index]}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="border border-gray-400 w-12 h-12 text-center text-gray-700 leading-tight focus:outline-none focus:border-[#125872] text-xl"
                  required
                />
              ))}
            </div>
            {otpError && (
              <p className="text-red-500 text-xs mt-2 text-center">{otpError}</p>
            )}
            <div className="flex items-center justify-center mb-4">
              <button
                type="submit"
                className="bg-[#125872] text-white font-bold w-full py-2 px-4 rounded"
              >
                Verify OTP
              </button>
            </div>
            <div className="flex justify-center">
              <Link to="/register" className="text-[#125872]">
                Want to change email?
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
