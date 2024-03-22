
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
      <CircleMouseFollower />
      <Navbar />

      {/* Login Page */}
      <div className='flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-blue-400 shadow-md'>
        {/* 2nd Half */}
        <div className='w-[26rem] bg-white h-[30rem] p-8 rounded-md shadow-lg '>
          <h1 className='text-black text-2xl font-bold mb-4 text-center'>Welcome Back!</h1>

          {/* Email */}
          <div className='mb-4'>
            <label htmlFor='email' className='text-black text-sm font-semibold'>
              Email/Username{' '}
            </label>
            <input type='email' id='email' name='email'   pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" className='border border-slate-500 w-full h-8 mt-1 rounded' required />
          </div>

          {/* Password */}
          <div className='mb-4'>
            <label htmlFor='password' className='text-black text-sm font-semibold'>
              Password
            </label>
            <input type='password' id='password' name='password' className='border border-slate-500 w-full h-8 mt-1 rounded' required />
          </div>

          {/* Checkbox and Forgot Password */}
          <div className='flex justify-between mb-4'>
            <div className='flex items-center'>
              <input type='checkbox' id='rememberMe' className='bg-teal-200 mr-2' />
              <label htmlFor='rememberMe' className='text-slate-400 text-sm'>
                Remember me
              </label>
            </div>
            <p className='text-slate-400 text-sm'>Forgot Password?</p>
          </div>

          {/* Log in Button */}
          <button className='text-white font-bold py-2 px-20 w-full h-10 bg-black rounded mb-4'>Log in</button>

          {/* Continue with Google Button */}
          <button onClick={handleGoogleSignIn} className='flex items-center justify-center text-white font-bold py-2 px-4 w-full h-10 bg-black rounded mb-4'>
            <FcGoogle className='mr-2' /> Continue with Google
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

          <div className='flex'>
            <p className='text-slate-400 mr-2'>New User?</p>
            <Link to='/SignUp' className='text-blue-500'>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

