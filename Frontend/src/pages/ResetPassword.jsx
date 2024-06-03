import React, { useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/reset-password/${token}`, { password });
      toast.success('Password has been reset successfully.', { autoClose: 2000 });
      history.push('/login');
    } catch (err) {
      console.error('Error resetting password:', err);
      setError('An error occurred while resetting the password.');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <h1>gfgg</h1>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn btn-primary">Reset Password</button>
      </form>
    </div>
  );
}
