import React, { useEffect } from 'react';
import axiosClient from '../utils/axios';

const Chat = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosClient.get('/user/user');
      console.log(response);
    };
    fetchData();
  }, []);
  return <div>Chat Works!</div>;
};

export default Chat;
