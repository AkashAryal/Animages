import React from 'react';
import { navLink } from './types';
import { NavLink, withRouter } from 'react-router-dom';

//assumes navLink should render
const Navbar = (props: any) => {
  const user = localStorage.getItem("authToken");

  const createNavLink = (navLink: navLink) => {
    console.log("m", props);
    const url = props.location.pathname;
    console.log("u", url);

    return (
      <li key={navLink.label} className={"nav-item" + (url === navLink.path ? " active" : "")}>
        <NavLink exact={true} activeClassName='is-active' className="nav-link" to={navLink.path}>{navLink.label}</NavLink>
      </li>
    )
  }

  const navLinks: navLink[] = [
    { path: "/", label: "Home" },
    { path: "/browse", label: "Browse" },
    { path: '/favorites', label: "Favorites", auth: true },
    { path: "/login", label: "Login", auth: false },
    { path: '/register', label: "Register" },
    { path: '/logout', label: "Logout", auth: true }
  ]

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <NavLink className="navbar-brand" to="/">Animages</NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            {
              navLinks.map((nl: navLink) => {
                if (nl.auth !== null && nl.auth === true) {//must be auth to access
                  if (user !== null)//loged in
                    return createNavLink(nl);
                } else if (nl.auth !== null && nl.auth === false) {
                  if (user === null)
                    return createNavLink(nl);
                } else //everyone
                  return createNavLink(nl);
              })
            }
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Navbar);