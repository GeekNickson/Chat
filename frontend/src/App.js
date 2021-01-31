import './App.css';
import Login from './components/Login';
import Chat from './components/Chat';
import React from 'react';
import { useToken } from './hooks/useToken';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axiosClient from './utils/axios';

const App = () => {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  } else {
    axiosClient.defaults.headers.common['auth-token'] = token;
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/chat">
            <Chat />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
