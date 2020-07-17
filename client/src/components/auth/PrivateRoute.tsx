import React from "react";
import { Route, Redirect } from "react-router-dom";
import { selectAuth } from './authSlice';
import { useSelector } from 'react-redux';

export function PrivateRoute(props: any) {
  const authId = localStorage.getItem("authToken");
  const allowIfAuth = props.allowIfAuth;

  if (allowIfAuth ? authId !== null : authId === null)
    return <Route {...props} />
  else
    return <Redirect to={props.redirect} />
}