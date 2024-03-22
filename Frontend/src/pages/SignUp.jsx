import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import CircleMouseFollower from "../Components/CircleMouseFollower";
import { FcGoogle } from "react-icons/fc";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // navigate to different page

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
  };

  function handleCallbackResponse(response) {
    console.log("encoded: " + response.credential);
    var object = response.credential;
    var userObject = jwtDecode(object);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signin").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signin").hidden = false;
  }

  useEffect(() => {
    //google
    google.accounts.id.initialize({
      client_id:
        "221746536037-24msh502h0uesab03aqi1vo0f3hbf9pi.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
  }, []);

  const handleGoogleSignIn = () => {
    google.accounts.id.prompt(); // Trigger Google sign-in process
  };

  return (
    <div className="font-Akaya bg-gray-100">
      <Navbar />
      <div className="h-dvh lg:flex lg:pt-0 pt-[2rem]">
        {/* 1st half */}

        <div className="lg:w-1/2 lg:mt-20 lg:ml-56 lg:mb-16 drop-shadow-xl mt-[1rem] ml-[1rem] mb-[5rem] w-[19.7rem] bg-gradient-to-r from-blue-200 to-blue-400">
          <h1 className="text-white lg:mt-7 lg:ml-8 font-bold mt-8 ml-2">
            MEDIMART
          </h1>
          <h1 className="font-bold text-white lg:text-5xl lg:mt-10 lg:pt-20 lg:ml-8 mt-[4rem] text-2xl ml-4 ">
            Welcome
          </h1>
          <h1 className="font-bold text-white lg:text-5xl lg:mt-7 lg:ml-8 mt-[0.7rem] text-2xl ml-4 ">
            Back!
          </h1>
        </div>

        {/* 2nd Half */}

        <div className="basis-1/2 bg-white lg:mt-20 lg:mb-16 md:h-[32.5rem] h-[25rem] lg:ml-0 lg:mr-56 drop-shadow-2xl mt-[-5rem] ml-[1rem] w-[19.7rem]">
          <h1 className="text-black text-2xl font-bold lg:mt-14 lg:ml-8 ml-[7rem] mt-4">
            Sign up
          </h1>
          <p className="text-slate-400 lg:mt-2 lg:ml-8 ml-[5rem] mt-2">
            Create Your Account.
          </p>

          {/* Username */}

          <h2 className="text-black text-sm font-semibold lg:mt-5 lg:ml-8 mt-4 ml-10">
            Username
          </h2>
          <input
            type="text"
            name="username"
            className="border border-slate-500 lg:w-80 lg:h-8 lg:mt-3 lg:ml-8 w-60 mt-2 ml-10 rounded"
            required
          />

          {/* Email */}
          <h2 className="text-black text-sm font-semibold lg:mt-5 lg:ml-8 mt-4 ml-10">
            Email
          </h2>
          <input
            type="text"
            name="username"
            className="border border-slate-500 lg:w-80 lg:h-8 lg:mt-3 lg:ml-8 w-60 mt-2 ml-10 rounded"
            required
          />

          {/* Password */}
          <h2 className="text-black text-sm font-semibold lg:mt-5 lg:ml-8 mt-4 ml-10">
            Password
          </h2>
          <input
            type="password"
            name="password"
            className="border border-slate-500 lg:w-80 lg:h-8 lg:mt-3 lg:ml-8 w-60 mt-2 ml-10 rounded"
            required
          />

          {/* Button */}
          <button className="text-white font-bold lg:w-80 lg:h-10 lg:ml-8 lg:mb-4 lg:mt-8 w-60 mt-4 ml-10 h-8 rounded bg-gradient-to-r from-blue-200 to-blue-400">
            Sign up
          </button>

          {/* <Link to="/"><button className="text-white font-bold w-80 h-10 ml-8 mb-4 mt-8 rounded" onClick={() =>signupp()} style={{backgroundColor:"#90CCBA"}}>
           Sign up
        </button></Link> */}

          <div className="flex">
            <p className=" text-slate-400  lg:ml-8 lg:mr-2 lg:mt-0 mt-2 ml-8">
              Already have an account?{" "}
            </p>
            {/* <p className=" mr-4" style={{color:"#90CCBA"}}> Login</p> */}
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
