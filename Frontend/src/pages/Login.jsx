import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../Components/AuthProvider';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '/src/assets/logo.jpg';

function Login() {
  const { login, isAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({ ...prevData, [name]: inputValue }));

    // Clear error messages when input values change
    if (name === "email") {
      setEmailError("");
      setUserNotFound(false);
    } else if (name === "password") {
      setPasswordError("");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      setPasswordError('');
      return; // Stop further execution
    }

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long.');
      return; // Stop further execution
    }

    try {
      const response = await axios.post(`${apiUrl}/login`, formData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      login({ user, token });
      toast.success('Login Success', { autoClose: 2000 });
      navigate('/')
      // Update context state with user data
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error === 'User not found') {
          setUserNotFound(true);
          setPasswordError('');
        } else if (error.response.data.error === 'Incorrect password') {
          setPasswordError('Incorrect password');
          setUserNotFound(false);
        } else {
          setErrorMessage(error.response.data.error);
          setPasswordError('');
        }
      } else {
        setErrorMessage('An error occurred during login.');
        setPasswordError('');
      }
    }
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
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className=" border-b border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#125872]"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-2">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            {emailError && (
              <p className="text-red-500 text-xs mt-2">{emailError}</p>
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
                className=" border-b border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#125872]"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  </svg>
                )}
              </div>
            </div>
            {passwordError && (
              <p className="text-red-500 text-xs mt-2">{passwordError}</p>
            )}
          </div>
          <div className="flex items-center justify-center mb-4">
            <button
              type="submit"
              className="bg-[#125872]  text-white font-bold w-full py-2 px-4 rounded "
              disabled={!formData.email || !formData.password}
            >
              Log in
            </button>
          </div>
          <div className="flex justify-center">
            <p className="text-gray-500 mr-2">New User?</p>
            <Link to="/Register" className="text-[#125872] font-semibold">
              Register
            </Link>
          </div>
        </form>
        {userNotFound && (
          <div className="mt-6 text-center">
            <p className="text-red-500 text-xs">
              User not found. Please <Link to="/Register" style={{ color: "#125872" }}>Register</Link> instead.
            </p>

          </div>
        )}
        <div className="text-center">
          <Link to="/forgetpassword" className="text-[#125872]">Forget Password </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;