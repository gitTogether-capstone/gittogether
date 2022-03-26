import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import SingleProject from "./components/SingleProject/SingleProject";
import Login from "./components/Login/Login";
import ProjectFeed from "./components/ProjectFeed/ProjectFeed.js";
import LandingPage from "./components/LandingPage/LandingPage";
import UserProfile from "./components/UserProfile/UserProfile";
import AddProject from "./components/AddProject/AddProject";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminNav from "./components/Admin/AdminNav";
import AdminProjects from "./components/Admin/AdminProjects";
import AdminSingleProject from "./components/Admin/AdminSingleProject";
import Chat from "./components/Chat/Chat";
import supabase from "./client";
import { setUser } from "./store/user";
import { useScrollTrigger } from "@mui/material";

function Routes(props) {
  const dispatch = useDispatch();
  // const [user, setUser] = useState([]);

  // const currentUser = useSelector((state) => state.user);
  //const [isAdmin, setIsAdmin] = useState([]);

  //const currentUser = supabase.auth.user;
  const isLoggedIn = useSelector((state) => {
    console.log("state.user", state.user);
    if (!state.user) return false;
    else if (!state.user.id) return false;
    else return true;
  });

  // useEffect(() => {
  //   fetchUser();
  //   fetchIsAdmin();
  // }, []);

  // const fetchUser = async () => {
  //   const { data } = await supabase.from("user").select("*");
  //   console.log("data", { data });
  //   setUser(data);
  // };

  //console.log("userrrr", user, "current user.user ahhhh", currentUser.user);

  // const isAdmin = () => {
  //   // if (currentUser.isAdmin) {
  //   return false;
  //   // }
  // };
  // isAdmin();

  // const fetchIsAdmin = async () => {
  //   let { data, error } = await supabase
  //     .from("user")
  //     .eq("userId", userId)
  //     .select("isAdmin");
  //   console.log("admin data", data);
  //   setIsAdmin(data);
  // };
  // const areYouAdmin = () => {
  //   for (let i = 0; i < user.length; i++) {
  //     let use = user[i];
  //     if ({ use } === currentUser.id) {
  //       console.log("user is not admin");
  //       console.log("user", user);
  //       console.log("user.id", use.id);
  //       console.log("currentUser.id", currentUser.id);
  //       return false;
  //     } else {
  //       console.log("user is admin");
  //       return true;
  //     }
  //   }
  // };
  // areYouAdmin();

  const isAdmin = false;

  // WHY can i see is admin when i get user, but not current user can we add that to the current user fetch Is this the right way to do this

  // let userINeed = [];
  // for (let i = 0; i < user.length; i++) {
  //   let userEl = user[i];
  //   if (userEl.id === currentUser.id) {
  //     console.log("eurika", currentUser.id, userEl.id);
  //     userINeed.push(userEl);
  //   } else {
  //     userINeed.push(currentUser);
  //   }
  // }

  // console.log("user", user);
  // console.log("currentUser", currentUser);
  // console.log("areyouadming", areYouAdmin);
  return (
    // <div>
    //   {/* {isLoggedIn && userINeed[0].isAdmin ? ( */}
    //   {isLoggedIn && isAdmin ? (
    //     <>
    //       <Switch>
    //         <Route path='/adminUsers' component={AdminUsers} />
    //         <Route exact path='/admin' component={AdminNav} />
    //         <Route exact path='/adminProjects' component={AdminProjects} />
    //         <Route exact path='/' component={AdminNav} />
    //         <Route
    //           path='/adminProjects/:projectId'
    //           component={AdminSingleProject}
    //         />
    //         <Route path='/login'>
    //           <Login session={props.session} />
    //         </Route>
    //       </Switch>
    //     </>
    //   ) : (
    <>
      {isLoggedIn ? (
        <Switch>
          <Route path='/user/:user' component={UserProfile} />
          <Route exact path='/addProject' component={AddProject} />
          <Route exact path='/chat' component={Chat} />
          <Route exact path='/projects' component={ProjectFeed} />
          <Route path='/login' component={Login} />
          <Route exact path='/projects/:projectId' component={SingleProject} />
          {/* <Route path="/admin" component={Admin} /> */}
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
    //   )}
    // </div>
  );
}

export default Routes;
