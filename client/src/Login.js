import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  // Create a state.
  const [state, setState] = useState({
    name: "",
    password: "",
  });

  const { name, password } = state;

  // Onchange event handler.
  const handleChange = (name) => (event) => {
    // console.log('name', name, 'event', event.target.value);
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ name, password });
    // axios
    //   .post(`${process.env.REACT_APP_API}/create`, { title, content, user })
    //   .then((response) => {
    //     // Empty the State.
    //     setState({ ...state, title: "", content: "", user: "" });
    //     alert(`A new post titled ${response.data.title} created!`);
    //   })
    //   .catch((error) => {
    //     alert(error.response.data.error);
    //   });
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

export default Login;
