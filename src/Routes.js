import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import Login from "./components/Login";
import ProjectFeed from "./components/ProjectFeed";

function Routes() {
  const isLoggedIn = useSelector((state) => state.user);
  console.log(isLoggedIn);
  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route exact path="/me" component={UserProfile} />
          <Route path="/projects" component={ProjectFeed} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
      )}
    </div>
  );
}

export default Routes;
