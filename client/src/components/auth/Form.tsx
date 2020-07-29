import React from 'react';
import { Link } from "react-router-dom";
type Props = {
  title: string;
  onSubmit: () => Promise<void>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>
}
export const Form = (props: Props) => {
  return (
    <form className="padding-top">
      <div className="card card-body ">
        <h1>{props.title}</h1>
        <div className="form-group ">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" onChange={(e) => props.setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input type="password" className="form-control" id="pwd" onChange={(e) => props.setPassword(e.target.value)} required />
        </div>
        <button type="button" className="btn btn-primary" onClick={props.onSubmit}>{props.title}</button>

        {
          props.title === "Login" &&
          <div>
            <hr />
            <span className="text-muted" style={{ fontSize: "1.5vh" }}>Don't have an account? <Link to="/register"> Click here to register</Link> </span>
          </div>
        }
      </div>

    </form>
  )
}