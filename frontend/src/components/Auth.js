import React, { useState } from 'react';
import './Auth.css';
import axiosClient from '../utils/axios';

const Auth = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('login');

  const login = async (event) => {
    event.preventDefault();
    if (state === 'login') {
      const response = await axiosClient.post('/user/login', { name: username, password: password });
      const token = response.headers['auth-token'];
      setToken(token);
      axiosClient.defaults.headers.common['auth-token'] = token;
    } else {
      const response = await axiosClient.post('/user/register', { name: username, password: password });
      console.log(response);
      setState('login');
    }
  };

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginStateHandler = () => {
    setState('login');
  };

  const registerStateHandler = () => {
    setState('register');
  };

  return (
    <div className="form-wrapper">
      <div className="form-content">
        <h2 className="login-text" onClick={loginStateHandler}>
          Sign in
        </h2>
        <h2 className="login-text" onClick={registerStateHandler}>
          Sign up
        </h2>
        <form className="form" onSubmit={login}>
          <input onChange={usernameChangeHandler} type="text" placeholder="Login" value={username} />
          <input onChange={passwordChangeHandler} type="password" placeholder="Password" value={password} />
          <button className="btn" type="submit">
            {state === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
