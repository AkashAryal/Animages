import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthToken, selectAuth } from './authSlice';
import { Link } from 'react-router-dom';

export function Register(props: any) {
  console.log("props.match", props.match);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const register = async () => {
    const res = await fetch("http://localhost:3001/register", {
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
      console.log("res status is 200", res.headers);
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

      <button onClick={register}></button>
      <Link to="/login">H</Link>
    </div>
  )
}