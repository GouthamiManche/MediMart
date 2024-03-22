import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom'; // Import useHistory from React Router
import axios from 'axios';

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
    try {
      const response = await axios.post('http://localhost:4000/api/register', formData);
      console.log(response.data); // Log the response from the backend
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred during registration.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <h2>Username</h2>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <h2>Email</h2>
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

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
