import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "./helpers";

// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return getUser() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      );
    }}
  />
);

export default PrivateRoute;
