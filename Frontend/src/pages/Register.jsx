import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


function Register() {
  const initialValues = { username: "", email: "", password: "" };
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  // Handle input change in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    // Perform validation
    const errors = validate(formData);
    setFormErrors(errors);

    // Check if there are any errors
    if (Object.keys(errors).length === 0) {
      // No errors, proceed with form submission
      try {
        await axios.post(
          "https://medicine-website-two.vercel.app/api/register", formData);

        // Registration successful, show success message and redirect to login page
        Swal.fire({
          title: "Registered Successfully!",
          text: "Please Login!",
          icon: "success",
          timer: 2000,
          timerProgressBar: true
        });
        navigate("/login"); // Redirect to login page
      } catch (error) {
        // Error occurred during registration, handle error
        console.error(error);
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage("An error occurred during registration.");
        }
      }
    }
  };

  // Validate form input fields
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

  return (
    <div className="bg-[#f5f5f5]">

      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-200 to-blue-400 p-8 md:mt-20 md:ml-56 md:mb-16 drop-shadow-xl">
          <div className="text-center md:text-left">
            <h1 className="font-bold text-white text-5xl md:text-5xl mt-10 pt-20">
              Welcome
            </h1>
            <h1 className="font-bold text-white mb-[6rem] text-5xl md:text-5xl mt-7">
              To Medimart
            </h1>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white md:mt-20 md:mb-16 md:mr-56 drop-shadow-2xl pl-8">
          <h1 className="text-black text-2xl font-bold mt-[3rem] md:ml-8">
            Register
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mt-6 md:mt-5 md:ml-8">
              <h2 className="text-black text-sm font-semibold">
                Username
              </h2>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className={`border border-slate-500 w-[80%] md:w-80 h-10 mt-3 rounded px-3 ${formErrors.username && isSubmit ? 'border-red-500' : ''}`}
              />
              {isSubmit && formErrors.username && <p className="text-red-500 text-xs mt-2 md:ml-0">{formErrors.username}</p>}
            </div>

            <div className="mt-6 md:mt-5 md:ml-8">
              <h2 className="text-black text-sm font-semibold">
                Email
              </h2>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`border border-slate-500 w-[80%] md:w-80 h-10 mt-3 rounded px-3 ${formErrors.email && isSubmit ? 'border-red-500' : ''}`}
              />
              {isSubmit && formErrors.email && <p className="text-red-500 text-xs mt-2 md:ml-0">{formErrors.email}</p>}
            </div>

            <div className="mt-6 md:mt-5 md:ml-8">
              <h2 className="text-black text-sm font-semibold">
                Password
              </h2>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`border border-slate-500 w-[80%] md:w-80 h-10 mt-3 rounded px-3 ${formErrors.password && isSubmit ? 'border-red-500' : ''}`}
              />
              {isSubmit && formErrors.password && <p className="text-red-500 text-xs mt-2 md:ml-0">{formErrors.password}</p>}
            </div>

            {errorMessage && <p className="text-red-500 text-sm mt-4 md:ml-8">{errorMessage}</p>}

            <button className="text-white font-bold w-[80%] md:w-80 h-10 mt-6 md:ml-8 md:mb-6 md:mt-8 rounded bg-gradient-to-r from-blue-200 to-blue-400">
              Register
            </button>
          </form>

          <div className="flex  md:ml-8">
            <p className="text-slate-400 mr-2">
              Already have an account?{" "}
            </p>
            <Link
              to="/login"
              style={{ color: "#90CCBA" }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;