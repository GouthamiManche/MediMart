import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '/src/assets/logo.jpg';

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const apiUrl = import.meta.env.VITE_API_URL;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true); // Set loading to true when form is submitted
      await axios.post(`${apiUrl}/forgot-password`, { email });
      setIsSubmitted(true);
      toast.success('Password reset email sent', { autoClose: 2000 });
    } catch (error) {
      console.error('Error sending reset email:', error);
      setEmailError('An error occurred while sending the reset email.');
    } finally {
      setLoading(false); // Set loading to false after request is complete
    }
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
        <div className="md:block hidden text-xl md:text-3xl font-bold ml-1 ">
            <span className="text-[#14496b]">Forget Password</span>   
          </div>
        </div>
        {isSubmitted ? (
          <div className="text-center text-green-500">
            <p>If an account with that email exists, a reset link has been sent.</p>
            <Link to="/login" className="text-[#125872] mt-4 block">Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="border-b border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#125872]"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-2 ">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              </div>
              {emailError && (
                <p className="text-red-500 text-xs mt-2">{emailError}</p>
              )}
            </div>
            <div className="flex items-center justify-center mb-4">
              <button
                type="submit"
                className="bg-[#125872] text-white font-bold w-full py-2 px-4 rounded"
                disabled={!email || loading} // Disable button when email is empty or when loading is true
              >
                {loading ? 'Sending...' : 'Send Reset Link'} {/* Show loading text when loading */}
              </button>
            </div>
            <div className="flex justify-center">
              <Link to="/login" className="text-[#125872] font-semibold">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
