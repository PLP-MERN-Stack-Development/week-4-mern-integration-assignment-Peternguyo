import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Register</h1>
      {error && <p className="text-red-600">{error}</p>}
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
};

export default Register;
