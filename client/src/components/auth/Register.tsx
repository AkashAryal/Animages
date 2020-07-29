import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthToken, selectAuth } from './authSlice';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../consts';
import { Form } from './Form';

export function Register(props: any) {
  console.log("props.match", props.match);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const register = async () => {
    if (username === '' || password === '') return;
    const res = await fetch(`${BASE_URL}/register`, {
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
    console.log("finished fetchng register");

    if (res.status == 200) {
      console.log("res status is 200", res.headers);
      localStorage.setItem("authToken", res.headers.get("authToken")!);
      props.history.push("/");
    } else {
      console.log("error when registering", res);
    }
  }

  return (
    <div className="container">
      {

      }
      <div className="row">
        <div className="col-md-6 offset-md-3 col-sm-12">
          <Form title="Register" onSubmit={register} setPassword={setPassword} setUsername={setUsername} />
        </div>
      </div>

    </div>
  )
}