import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from './authSlice';
import { BASE_URL } from '../../consts';

export function Login(props: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authId = useSelector(selectAuth);
  console.log(authId);
  const login = async () => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })

    if (res.status == 200) {
      localStorage.setItem("authToken", res.headers.get("authToken")!);
      props.history.push("/");
    } else {
      console.log("error when registering", res);
    }
  }

  return (
    <div>
      <label htmlFor="username">Username</label>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={login}></button>
    </div>
  )
}