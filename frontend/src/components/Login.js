import React from 'react';
import './Login.css'

const Login = () => {


  
  return (
    <div className="form-wrapper">
      <div className="form-content">
        <h2 class="login-text">Sign in</h2>
        <form>
          <input type="text" placeholder="Login" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};
