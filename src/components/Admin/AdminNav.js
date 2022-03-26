import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../store/user";
import {
  Link,
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
//import SingleProject from "./components/SingleProject/SingleProject";
import AdminUsers from "./AdminUsers";
import AdminProjects from "./AdminProjects";
import AdminSingleProject from "./AdminSingleProject";
//import Login from "./components/Login/Login";

const AdminNav = () => {
  const [project, setProject] = useState([]);
  //   const dispatch = useDispatch();
  //   const user = useSelector((state) => state.user);

  //   const isLoggedIn = useSelector((state) => {
  //     if (!state.user) return false;
  //     else if (!state.user.id) return false;
  //     else return true;
  //   });
  //   const logout = () => {
  //     dispatch(signOut());
  //   };

  return (
    <Route>
      <div>
        <nav>
          <h2>GitTogether</h2>
          {/* <Link to='/'>Home</Link>
        <Link to='/robots'>Robots</Link> */}
          <Link to='/adminUsers'>Users</Link>
          <br />
          <Link to='/adminProjects'>Projects</Link>
        </nav>
        <main>
          <h1> Hello </h1>
          <p> World </p>
          <div className='dark-container'>
            <Switch>
              <Route exact path='/adminUsers' component={AdminUsers} />
              <Route exact path='/adminProjects' component={AdminProjects} />
              <Route
                path='/adminProjects/projectId'
                component={AdminSingleProject}
              />
            </Switch>
          </div>
        </main>
      </div>
    </Route>
  );
};

export default AdminNav;
