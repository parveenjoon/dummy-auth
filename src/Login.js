import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/profile');
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome back! 👋</h2>
        <h3>Sign in to your account</h3>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Your email</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">CONTINUE</button>
        </form>
        {error && <p className="error">{error}</p>}
        <a href="/forgot-password">Forgot your password?</a>
        <p>
          Don't have an account? <a href="/sign-up">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
