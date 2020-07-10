import React from 'react';
import { Redirect } from 'react-router-dom';
export function Logout() {

  function logout() {
    localStorage.removeItem("authToken");

  }
  logout();
  return (
    <Redirect to="/" />
  )
}