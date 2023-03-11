import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useToken from './useToken';
import './App.css';

import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Preferences from '../Preferences/Preferences';



function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
        <h1>Application</h1>
        <BrowserRouter>
        <Routes>
          <Route path="preferences" element={<Preferences />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      </div>
    );
}

export default App;
