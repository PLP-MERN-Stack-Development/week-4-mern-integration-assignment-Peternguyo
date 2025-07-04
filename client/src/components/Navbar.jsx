import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await axios.post('/api/auth/logout', {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-2">
      <div className="flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">📝 MERN Blog</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <span>👋 {user.name}</span>
              <Link to="/create" className="hover:underline">Create Post</Link>
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
