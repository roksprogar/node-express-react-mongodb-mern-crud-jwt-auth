import React from "react";
import { Link } from "react-router-dom";
import { getUser, logOut } from "./helpers";
import { withRouter } from "react-router-dom";

const Nav = (props) => {
  return (
    <nav>
      <ul className="nav nav-tabs">
        <li className="nav-item pe-3 pt-3 pb-3">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item pe-3 pt-3 pb-3">
          <Link to="/create">Create</Link>
        </li>
        {!getUser() && (
          <li className="nav-item pe-3 pt-3 pb-3">
            <Link to="/login">Log in</Link>
          </li>
        )}
        {getUser() && (
          <li
            style={{ cursor: "pointer" }}
            className="nav-item pe-3 pt-3 pb-3"
            onClick={() => logOut(() => props.history.push("/"))}
          >
            Log out
          </li>
        )}
      </ul>
    </nav>
  );
};

export default withRouter(Nav);
