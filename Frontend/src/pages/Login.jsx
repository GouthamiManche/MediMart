
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import CircleMouseFollower from '../Components/CircleMouseFollower';
import { FcGoogle } from 'react-icons/fc';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/login', formData);
      console.log(response.data); // Log the response from the backend
      localStorage.setItem('token', token);
      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred during login.');
      }
    }

    console.log('Email:', email);
    console.log('Password:', password);
  };

  function handleCallbackResponse(response) {
    console.log('encoded: ' + response.credential);
    var object = response.credential;
    var userObject = jwtDecode(object);
    console.log(userObject);
    setUser(userObject);
    document.getElementById('signin').hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById('signin').hidden = false;
  }

  useEffect(() => {
    //google
    google.accounts.id.initialize({
      client_id: '221746536037-24msh502h0uesab03aqi1vo0f3hbf9pi.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });
  }, []);

  const handleGoogleSignIn = () => {
    google.accounts.id.prompt(); // Trigger Google sign-in process
  };

  return (
    <div className='font-Akaya'>
      {/* <CircleMouseFollower /> */}
      <Navbar />
      <div className=' h-dvh flex bg-gray-100'>
      {/* 1st half */}
        
      <div className='w-1/2 mt-20 ml-56 mb-16 drop-shadow-xl bg-gradient-to-r from-blue-200 to-blue-400'>
                    <h1 className='text-white mt-7 ml-8 font-bold'>MEDIMART</h1>
                    <h1 className='font-bold text-white text-5xl mt-10 pt-20 ml-8 '>Welcome</h1>
                    <h1 className='font-bold text-white text-5xl mt-7 ml-8'>Back!</h1>
            </div>

                    {/* 2nd Half */}

            <div className='basis-1/2 bg-white mt-20 mb-16 mr-56 drop-shadow-2xl '>

                <h1 className='text-black text-2xl font-bold mt-14 ml-8' >Login</h1>
                <p className='text-slate-400 mt-2 ml-8'>Welcome back! Please login to your <br/>account</p>
                

                      {/* Email */}
                <h2 className='text-black text-sm font-semibold mt-5 ml-8'>Email/Username</h2>
                <input type="email" name="username" className='border border-slate-500 w-80 h-8 mt-3 ml-8 rounded'required/>

                      {/* Password */}
                <h2 className='text-black text-sm font-semibold mt-5 ml-8'>Password</h2>
                <input type="password" name="password" className='border border-slate-500 w-80 h-8 mt-3 ml-8 rounded'required/>

                     {/* CheckBox */}
            <p className='flex'> 
                <p className="flex">
                    <input type="checkbox" id="rememberMe" className='bg-teal-200 mt-4 mb-5 ml-8 mr-2'/>
                    <p className="mt-6 ml-0 text-slate-400 text-sm">Remember me</p>
                </p>
                <p className="ml-20 mb-8 mt-6 text-slate-400 text-sm mr-10">Forgot Password?</p>
            </p>

            
                {/* Log in Button */}
                <button className="text-white font-bold py-2 px-20 w-80 h-10 ml-8 rounded bg-gradient-to-r from-blue-200 to-blue-400">
                    Log in
                </button>
                <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <div id='signin' className='font-bold py-2'></div>
              {Object.keys(user).length !== 0 && (
                <button className='font-bold py-2 px-4' onClick={(e) => handleSignOut(e)}>
                  Sign Out
                </button>
              )}
            </div>
          </form>

             

                <div className="flex">
                    <p className=" text-slate-400 mt-2 ml-8 mr-2">New User? </p>
                    <Link to='/SignUp' className="mt-2" style={{color:"#90CCBA"}}>Signup</Link>
                </div>
                
            </div>
        </div>
        </div>
  );
}

export default Login;

