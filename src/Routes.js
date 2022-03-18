import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserProfile from './components/UserProfile';

function Routes() {
  const isLoggedIn = useSelector((state) => state.user);

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route exact path="/me" component={UserProfile} />
        </Switch>
      ) : null}
    </div>
  );
}
