import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import Login from "./components/Login";

function Routes() {
  const isLoggedIn = useSelector((state) => {
    return state.user ? !!state.user.id : state.user;
  });
  console.log(!!isLoggedIn);
  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route exact path="/me" component={UserProfile} />
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
