import React, { useState } from 'react';
import './Login.css';
import axiosClient from '../utils/axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (event) => {
    event.preventDefault();
    const response = await axiosClient.post('/user/login', { name: username, password: password });
    axiosClient.defaults.headers.common['auth-token'] = response.headers['auth-token'];
  };

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="form-wrapper">
      <div className="form-content">
        <h2 className="login-text">Sign in</h2>
        <form className="form" onSubmit={login}>
          <input onChange={usernameChangeHandler} type="text" placeholder="Login" value={username} />
          <input onChange={passwordChangeHandler} type="password" placeholder="Password" value={password} />
          <button className="btn" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
