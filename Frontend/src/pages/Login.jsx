import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../Components/AuthProvider';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

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
      const response = await axios.post('https://medicine-website-two.vercel.app/api/login', formData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      login({ user, token });
      Swal.fire({
        title: "Login Done Successfully!",
        text: "Please Shop",
        icon: "success",
        timer: 2000,
      timerProgressBar: true
      });
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

    // const handleAddToCart = (product, quantity) => {
    //   if (!isAuthenticated) {
    //     Swal.fire({
    //       icon: 'warning',
    //       title: 'Please Log In',
    //       text: 'You need to be logged in to add items to your cart.',
    //     });
    //     navigate('/login'); // Redirect to login page
    //     return;
    //   }}

  };



  return (
    <div className="bg-[#f5f5f5]">

      <div className="flex flex-col md:flex-row  h-screen">
        {/* 1st half */}
        <div className="w-full   md:w-1/2 bg-gradient-to-r from-blue-200 to-blue-400 p-8 md:mt-20 md:ml-56 md:mb-16 drop-shadow-xl ">
          {/* <h1 className="text-white mt-7 ml-8 font-bold">MEDIMART</h1> */}
          <div className="text-center md:text-left">
            <h1 className="font-bold text-white text-5xl mt-10 pt-20 ml-8">
              Welcome
            </h1>
            <h1 className="font-bold text-white text-5xl mt-7 mb-[6rem] ml-8">Back!</h1>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white md:mt-20 md:mb-16 md:mr-56 drop-shadow-2xl pl-8">
          <h1 className="text-black text-2xl font-bold mt-[4rem] md:ml-8">Login</h1>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mt-8 md:ml-8">
              <h2 className="text-black text-sm font-semibold">
                Email
              </h2>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-slate-500 w-full md:w-80 h-10 mt-2 rounded px-3"
                required
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-2">{emailError}</p>
              )}
            </div>

            {/* Password */}
            <div className="mt-8 md:ml-8">
              <h2 className="text-black text-sm font-semibold">Password</h2>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-slate-500 md:w-80 w-full h-10 mt-2 rounded px-3"
                required
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-2">{passwordError}</p>
              )}
            </div>

            {/* Log in Button */}
            <button
              type="submit"
              className="text-white font-bold w-full md:w-80 h-10 mt-8 md:ml-8 rounded bg-gradient-to-r from-blue-200 to-blue-400"
              disabled={!formData.email || !formData.password}
            >
              Log in
            </button>
          </form>

          {userNotFound && (
            <div className="mt-6 md:ml-8">
              <p className="text-red-500 text-xs">
                User not found. Please Signup instead.
              </p>
            </div>
          )}

          <div className="flex mt-6 md:ml-8">
            <h3 className="text-slate-400 mr-2">New User?</h3>
            <Link to="/Register" style={{ color: "#90CCBA" }}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;