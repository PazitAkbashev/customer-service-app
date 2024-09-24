import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/loginStyle.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      // Handle successful login
      const user = response.data.user;  // נשלוף את פרטי המשתמש שהתקבלו מהשרת
      const token = response.data.token;

      // שמירת המשתמש בלוקאל סטורג'
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        id: user.id, // מזהה נורמלי שמתקבל מהשרת
        username: user.username,
        role: user.role
      }));

      console.log('User logged in:', user);
      
      // Redirect to home page after successful login
      navigate('/home');
    } catch (err) {
      // Handle errors
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        <p>Don't have an account?</p>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
}

export default LoginPage;
