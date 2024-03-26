import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function SignUp() {
  const initialValues = { username: "", email: "", password: "" };
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
        const response = await axios.post(
          "http://localhost:4000/api/register",
          formData
        );
        console.log(response.data);
        // Redirect to login page
        navigate("/login");
      } catch (error) {
        console.error(error);
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage("An error occurred during registration.");
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
      errors.username = "Username must be at least 6 characters long";
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
    <div className="font-Akaya bg-gray-100">
      <Navbar />
      <div className="h-dvh lg:flex lg:pt-0 pt-[2rem]">
        <div className="lg:w-1/2 lg:mt-20 lg:ml-56 lg:mb-16 drop-shadow-xl mt-[1rem] ml-[1rem] mb-[5rem] w-[19.7rem] bg-gradient-to-r from-blue-200 to-blue-400">
          <h1 className="text-white lg:mt-7 lg:ml-8 font-bold mt-8 ml-2">
            MEDIMART
          </h1>
          <h1 className="font-bold text-white lg:text-5xl lg:mt-10 lg:pt-20 lg:ml-8 mt-[4rem] text-2xl ml-4 ">
            Welcome
          </h1>
          <h1 className="font-bold text-white lg:text-5xl lg:mt-7 lg:ml-8 mt-[0.7rem] text-2xl ml-4 ">
          To Medimart
          </h1>
        </div>

        <div className="basis-1/2 bg-white lg:mt-20 lg:mb-16 md:h-[32.5rem] h-[25rem] lg:ml-0 lg:mr-56 drop-shadow-2xl mt-[-5rem] ml-[1rem] w-[19.7rem]">
          <h1 className="text-black text-2xl font-bold lg:mt-14 lg:ml-8 ml-[7rem] mt-4">
            Sign up
          </h1>
          
          <form onSubmit={handleSubmit}>
            <div>
              <h2 className="text-black text-sm font-semibold lg:mt-5 lg:ml-8 mt-4 ml-10">
                Username
              </h2>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className={`border border-slate-500 lg:w-80 lg:h-8 lg:mt-3 lg:ml-8 w-60 mt-2 ml-10 rounded ${formErrors.username && isSubmit ? 'border-red-500' : ''}`}
              />
              {isSubmit && formErrors.username && <p className="text-red-500 ml-10">{formErrors.username}</p>}
            </div>

            <div>
              <h2 className="text-black text-sm font-semibold lg:mt-5 lg:ml-8 mt-4 ml-10">
                Email
              </h2>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`border border-slate-500 lg:w-80 lg:h-8 lg:mt-3 lg:ml-8 w-60 mt-2 ml-10 rounded ${formErrors.email && isSubmit ? 'border-red-500' : ''}`}
              />
              {isSubmit && formErrors.email && <p className="text-red-500 ml-10">{formErrors.email}</p>}
            </div>

            <div>
              <h2 className="text-black text-sm font-semibold lg:mt-5 lg:ml-8 mt-4 ml-10">
                Password
              </h2>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`border border-slate-500 lg:w-80 lg:h-8 lg:mt-3 lg:ml-8 w-60 mt-2 ml-10 rounded ${formErrors.password && isSubmit ? 'border-red-500' : ''}`}
              />
              {isSubmit && formErrors.password && <p className="text-red-500 ml-10">{formErrors.password}</p>}
            </div>

            {errorMessage && <p className="text-red-500 ml-10">{errorMessage}</p>}

            <button className="text-white font-bold lg:w-80 lg:h-10 lg:ml-8 lg:mb-4 lg:mt-8 w-60 mt-4 ml-10 h-8 rounded bg-gradient-to-r from-blue-200 to-blue-400">
              Sign up
            </button>
          </form>

          <div className="flex">
            <p className="text-slate-400 lg:ml-8 lg:mr-2 lg:mt-0 mt-2 ml-8">
              Already have an account?{" "}
            </p>
            <Link
              to="/login"
              className="lg:mb-12 lg:mb-4 lg:mt-0 mt-2 "
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

export default SignUp;
``
