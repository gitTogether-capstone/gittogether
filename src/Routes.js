import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import SingleProject from "./components/SingleProject/SingleProject";
import Login from "./components/Login/Login";
import ProjectFeed from "./components/ProjectFeed/ProjectFeed.js";
import LandingPage from "./components/LandingPage/LandingPage";
import UserProfile from "./components/UserProfile/UserProfile";
import AddProject from "./components/AddProject/AddProject";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminNav from "./components/Admin/AdminNav/AdminNav";
import AdminProjects from "./components/Admin/AdminProjects";
import AdminSingleProject from "./components/Admin/AdminSingleProject";
import Chat from "./components/Chat/Chat";
import { useScrollTrigger } from "@mui/material";
import supabase from "./client";

function Routes(props) {
  const [user, setUser] = useState([]);
  const currentUser = useSelector((state) => state.user);

  const isLoggedIn = useSelector((state) => {
    console.log("state.user", state.user);
    if (!state.user) return false;
    else if (!state.user.id) return false;
    else return true;
  });

  useEffect(() => {
    async function fetchUser() {
      const { data: user } = await supabase
        .from("user")
        .select("*")
        .eq("id", currentUser.id);

      setUser(user);
    }
    fetchUser();
  }, []);

  const isAdmin = true;
  console.log(user);
  return (
    <div>
      {/* {isLoggedIn && userINeed.isAdmin ? ( */}
      {/* {isLoggedIn && user[0].isAdmin ? ( */}
      {isLoggedIn && isAdmin ? (
        <>
          <Switch>
            <Route path='/adminUsers' component={AdminUsers} />
            <Route exact path='/admin' component={AdminNav} />
            <Route exact path='/adminProjects' component={AdminProjects} />
            <Route exact path='/' component={AdminNav} />

            <Route
              path='/adminProjects/:projectId'
              component={AdminSingleProject}
            />

            <Route path='/login'>
              <Login session={props.session} />
            </Route>
          </Switch>
        </>
      ) : (
        <>
          {isLoggedIn ? (
            <Switch>
              <Route path='/user/:user' component={UserProfile} />
              <Route exact path='/addProject' component={AddProject} />
              <Route exact path='/chat' component={Chat} />
              <Route exact path='/projects' component={ProjectFeed} />
              <Route path='/login' component={Login} />
              <Route
                exact
                path='/projects/:projectId'
                component={SingleProject}
              />
              <Route exact path='/'>
                <ProjectFeed session={props.session} />
              </Route>
              <Route path='/login'>
                <Login session={props.session} />
              </Route>
            </Switch>
          ) : (
            <Switch>
              <Route path='/login' component={Login} />
              <Route exact path='/' component={LandingPage} />
            </Switch>
          )}
        </>
      )}
    </div>
  );
}

export default Routes;
