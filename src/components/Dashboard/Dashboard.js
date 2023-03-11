import React from 'react';

export default function Dashboard() {
  return(
    <div id="wrapper">
        <h2>Dashboard</h2>
        <h3 className="welcome">Welcome, {localStorage.getItem('username')}</h3>
        <button onClick={logout}>Logout</button>
    </div>
    
    
  );
}

function logout() {
    localStorage.removeItem('token');
    window.location.reload();
}