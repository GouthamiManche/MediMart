import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

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
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <h2>Email/Username</h2>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <h2>Password</h2>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;
