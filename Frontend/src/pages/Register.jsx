import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Logo from '/src/assets/logo.jpg';

function Register() {
  const initialValues = { username: "", email: "", password: "" };
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await axios.post(`${apiUrl}/register`, formData);
        toast.success('Registered Successfully', { autoClose: 2000 });
        navigate("/login");
      } catch (error) {
        console.error("Registration error:", error);
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage("An internal server error occurred during registration.");
        }
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.username.trim()) {
      errors.username = "Username is required";
    } else if (values.username.length < 6 || values.username.length > 15) {
      errors.username = "Username must be between 6 and 15 characters long";
    }

    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password.trim()) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    return errors;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={`border-b border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#125872] ${
                formErrors.username && isSubmit ? 'border-red-500' : ''
              }`}
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-2">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            {isSubmit && formErrors.username && (
              <p className="text-red-500 text-xs mt-2">{formErrors.username}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`border-b border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#125872] ${
                formErrors.email && isSubmit ? 'border-red-500' : ''
              }`}
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-2">
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
            {isSubmit && formErrors.email && (
              <p className="text-red-500 text-xs mt-2">{formErrors.email}</p>
            )}
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`border-b border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#125872] ${
                  formErrors.password && isSubmit ? 'border-red-500' : ''
                }`}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  </svg>
                )}
              </div>
            </div>
            {isSubmit && formErrors.password && (
              <p className="text-red-500 text-xs mt-2">{formErrors.password}</p>
            )}
          </div>
          {errorMessage && <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#125872] text-white font-bold py-2 px-4 rounded w-full"
            >
              Register
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <p className="text-gray-500 mr-2">Already have an account?</p>
          <Link to="/login" className="text-[#125872] font-semibold">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
