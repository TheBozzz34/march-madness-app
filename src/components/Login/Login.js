import React, { useState } from 'react';
import bcrypt from "bcryptjs-react"
import PropTypes from 'prop-types';

import './Login.css';

async function loginUser(credentials) {

    const hashedPassword = await bcrypt.hash(credentials.password, 10)
    console.log(JSON.stringify({ username: credentials.username, password: hashedPassword }))

    
        return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: credentials.username, password: hashedPassword })
        }).then(data => data.json()) 

      
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        console.log(token.token);
        
        if (token.token) {
            setToken(token);
        } else {
            alert("Invalid username or password")
        }

    }

    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <p className="login-text">Test credentials: Username: <strong>username</strong> Password: <strong>password</strong></p>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }