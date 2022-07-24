import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";
import { getUser, authenticate } from "./helpers";

const Login = (props) => {
  // Create a state.
  const [state, setState] = useState({
    name: "",
    password: "",
  });

  const { name, password } = state;

  useEffect(() => {
    getUser() && props.history.push("/");
  }, [props.history]);

  // Onchange event handler.
  const handleChange = (name) => (event) => {
    // console.log('name', name, 'event', event.target.value);
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log({ name, password });
    axios
      .post(`${process.env.REACT_APP_API}/login`, { name, password })
      .then((response) => {
        // console.log(response);
        // Response will contain token and name, let's store it.
        authenticate(response, () => props.history.push("/"));
        // Redirect to create page.
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  return (
    <div className="container pb-5">
      <Nav />
      <br />
      <h1>Log in</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange("name")}
            value={name}
            type="text"
            className="form-control"
            placeholder="Name"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="text-muted">Password</label>
          <input
            onChange={handleChange("password")}
            value={password}
            type="text"
            className="form-control"
            placeholder="Your password"
            required
          />
        </div>
        <div>
          <button className="btn btn-primary">Log in</button>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Login);
