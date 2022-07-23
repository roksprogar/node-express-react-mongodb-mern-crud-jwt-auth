import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import PostCreate from "./PostCreate";
import PostSingle from "./PostSingle";
import PostUpdate from "./PostUpdate";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/create" exact component={PostCreate} />
        <Route path="/post/:slug" exact component={PostSingle} />
        <Route path="/post/update/:slug" exact component={PostUpdate} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
