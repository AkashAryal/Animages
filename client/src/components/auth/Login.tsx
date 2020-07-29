import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from './authSlice';
import { BASE_URL } from '../../consts';
import { Form } from "./Form";

export function Login(props: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authId = useSelector(selectAuth);
  console.log(authId);
  const login = async () => {
    if (username === '' || password === '') return;

    const res = await fetch(`${BASE_URL}/api/login`, {
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
      console.log("error when login", res);
    }
  }

  return (
    <div className="container">
      {

      }
      <div className="row">
        <div className="col-md-6 offset-md-3 col-sm-12">
          <Form title="Login" onSubmit={login} setPassword={setPassword} setUsername={setUsername} />
        </div>
      </div>

    </div>
  )
}