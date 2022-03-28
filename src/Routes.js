import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import SingleProject from './components/SingleProject/SingleProject';
import Login from './components/Login/Login';
import ProjectFeed from './components/ProjectFeed/ProjectFeed.js';
import LandingPage from './components/LandingPage/LandingPage';
import UserProfile from './components/UserProfile/UserProfile';
import AddProject from './components/AddProject/AddProject';
import Chat from './components/Chat/Chat';
import NotFound from './components/NotFound/NotFound';
import supabase from './client';


function Routes(props) {
  const isLoggedIn = supabase.auth.user();

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/user/:user" component={UserProfile} />
          <Route exact path="/addProject" component={AddProject} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/projects" component={ProjectFeed} />
          <Route path="/login" component={Login} />
          <Route exact path="/projects/:projectId" component={SingleProject} />
          <Route exact path="/">
            <ProjectFeed session={props.session} />
          </Route>
          <Route path="/login">
            <Login session={props.session} />
          </Route>
          <Route path="*" component={NotFound} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={LandingPage} />
          <Route path="*">{!isLoggedIn ? <Redirect to="/" /> : null}</Route>
        </Switch>
      )}
    </div>
  );
}

export default Routes;
