import { useState } from 'react';

export const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);
    return token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
    setToken(token);
  };

  return {
    setToken: saveToken,
    token,
  };
};
