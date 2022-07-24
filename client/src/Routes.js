import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import PostCreate from "./PostCreate";
import PostSingle from "./PostSingle";
import PostUpdate from "./PostUpdate";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/login" exact component={Login} />
        <Route path="/post/:slug" exact component={PostSingle} />
        <PrivateRoute path="/create" exact component={PostCreate} />
        <PrivateRoute path="/post/update/:slug" exact component={PostUpdate} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
