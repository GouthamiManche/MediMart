import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import CircleMouseFollower from "../Components/CircleMouseFollower";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
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
// 
//     const { email, password } = formData;
  
//     // Validate email
//     if (!validateEmail(email)) {
//       setEmailError("Please enter a valid email address.");
//       setPasswordError("");
//     } else {
//       // Email is valid, validate password
//       if (!validatePassword(password)) {
//         setPasswordError("Password must be at least 8 characters long.");
//       } else {
//         setPasswordError("");
//       }
  
//       // If both email and password are valid, proceed with login
//       if (validateEmail(email) && validatePassword(password)) {
//         try {
//           const response = await axios.post(
//             "http://localhost:4000/api/login",
//             formData
//           );
//           console.log(response.data); // Log the response from the backend
//           navigate("/");
//         } catch (error) {
//           console.error("Error during login:", error);
//           if (error.response && error.response.data && error.response.data.error) {
//             if (error.response.data.error === "User not found") {
//               setUserNotFound(true);
//               setPasswordError("");
//             } else if (error.response.data.error === "Incorrect password") {
//               setPasswordError("Incorrect password");
//               setUserNotFound(false);
//             } else {
//               setErrorMessage(error.response.data.error);
//               setPasswordError("");
//             }
//           } else {
//             setErrorMessage("An error occurred during login.");
//             setPasswordError("");
//           }
//         }
//       }
//     }
  };

  return (
    <div className="font-Akaya">
      <Navbar />
      <div className=" h-dvh flex bg-gray-100">
        {/* 1st half */}
        <div className="w-1/2 mt-20 ml-56 mb-16 drop-shadow-xl bg-gradient-to-r from-blue-200 to-blue-400">
          <h1 className="text-white mt-7 ml-8 font-bold">MEDIMART</h1>
          <h1 className="font-bold text-white text-5xl mt-10 pt-20 ml-8 ">
            Welcome
          </h1>
          <h1 className="font-bold text-white text-5xl mt-7 ml-8">Back!</h1>

        </div>

        {/* 2nd Half */}
        <div className="basis-1/2 bg-white mt-20 mb-16 mr-56 drop-shadow-2xl ">
          <h1 className="text-black text-2xl font-bold mt-14 ml-8">Login</h1>
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <h2 className="text-black text-sm font-semibold mt-5 ml-8">
              Email/Username
            </h2>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-slate-500 w-80 h-8 mt-3 ml-8 rounded"
              required
            />
            {emailError && (
              <p className="text-red-500 ml-8 mt-1">{emailError}</p>
            )}

            {/* Password */}
            <h2 className="text-black text-sm font-semibold mt-5 ml-8">
              Password
            </h2>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-slate-500 w-80 h-8 mt-3 ml-8 rounded"
              required
            />
            {passwordError && (
              <p className="text-red-500 ml-8 mt-1">{passwordError}</p>
            )}

            {/* CheckBox */}
            <div className="flex">
              <div className="flex">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="bg-teal-200 mt-4 mb-5 ml-8 mr-2"
                />
                <h3 className="mt-6 ml-0 text-slate-400 text-sm">Remember me</h3>
              </div>
              <h3 className="ml-20 mb-8 mt-6 text-slate-400 text-sm mr-10">
                Forgot Password?
              </h3>
            </div>

            {/* Log in Button */}
            <button
              type="submit"
              className="text-white font-bold py-2 px-20 w-80 h-10 ml-8 rounded bg-gradient-to-r from-blue-200 to-blue-400"
              disabled={!formData.email || !formData.password}
            >
              Log in
            </button>
          </form>
          {userNotFound && (
            <div className="flex ml-8 mt-4">
              <p className="text-red-500">
                User not found. Please Signup
                
                instead.
              </p>
            </div>
          )}
          {/* ... */}
          <div className="flex">
            <h3 className=" text-slate-400 mt-2 ml-8 mr-2">New User? </h3>
            <Link to="/SignUp" className="mt-2" style={{ color: "#90CCBA" }}>
              Signup
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;