import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserProfile from './components/UserProfile/UserProfile';
import Login from './components/Login';
import ProjectFeed from './components/ProjectFeed/ProjectFeed.js';
import Home from './components/Home';

function Routes(props) {
  const isLoggedIn = useSelector((state) => {
    if (!state.user) return false;
    else if (!state.user.id) return false;
    else return true;
  });
  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route exact path="/me">
            <UserProfile session={props.session} />
          </Route>
          <Route exact path="/">
            <ProjectFeed session={props.session} />
          </Route>
          <Route path="/login">
            <Login session={props.session} />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
        </Switch>
      )}
    </div>
  );
}

export default Routes;