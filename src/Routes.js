// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Route, Switch, Redirect } from "react-router-dom";
// import SingleProject from "./components/SingleProject/SingleProject";
// import Login from "./components/Login/Login";
// import ProjectFeed from "./components/ProjectFeed/ProjectFeed.js";
// import LandingPage from "./components/LandingPage/LandingPage";
// import UserProfile from "./components/UserProfile/UserProfile";
// import AddProject from "./components/AddProject/AddProject";
// import Admin from "./components/Admin/Admin";
// import AdminNav from "./components/Admin/AdminNav";
// import Chat from "./components/Chat/Chat";
// import supabase from "./client";

// function Routes(props) {
//   const dispatch = useDispatch();
//   const [user, setUser] = useState([]);
//   const isLoggedIn = useSelector((state) => {
//     if (!state.user) return false;
//     else if (!state.user.id) return false;
//     else return true;
//   });

//   useEffect(() => {
//     fetchUser();
//   });

//   async function fetchUser() {
//     const { data } = await supabase.from("user").select("*");
//     console.log("data", { data });
//     setUser(data);
//   }
//   fetchUser();
//   console.log("userrrr", user);
//   return (
//     <div>
//       {/* {isLoggedIn && isAdmin ? (
//         <Switch>
//           <Route path='/adminnav/admin' component={Admin} />
//           <Route path='/adminnav' component={AdminNav} />
//           <Route exact path='/'>
//             <ProjectFeed session={props.session} />
//           </Route>
//           <Route path='/login'>
//             <Login session={props.session} />
//           </Route>
//         </Switch>
//       ) : ( */}
//       <>
//         {isLoggedIn ? (
//           <Switch>
//             <Route path='/user/:user' component={UserProfile} />
//             <Route exact path='/addProject' component={AddProject} />
//             <Route exact path='/chat' component={Chat} />
//             <Route exact path='/projects' component={ProjectFeed} />
//             <Route path='/login' component={Login} />
//             <Route
//               exact
//               path='/projects/:projectId'
//               component={SingleProject}
//             />
//             <Route exact path='/'>
//               <ProjectFeed session={props.session} />
//             </Route>
//             <Route path='/login'>
//               <Login session={props.session} />
//             </Route>
//           </Switch>
//         ) : (
//           <Switch>
//             <Route path='/login' component={Login} />
//             <Route exact path='/' component={LandingPage} />
//           </Switch>
//         )}
//       </>
//       )}
//     </div>
//   );
// }

// export default Routes;

import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SingleProject from "./components/SingleProject/SingleProject";
import Login from "./components/Login/Login";
import ProjectFeed from "./components/ProjectFeed/ProjectFeed.js";
import LandingPage from "./components/LandingPage/LandingPage";
import UserProfile from "./components/UserProfile/UserProfile";
import AddProject from "./components/AddProject/AddProject";
import Admin from "./components/Admin/Admin";
import Chat from "./components/Chat/Chat";
import AdminNav from "./components/Admin/AdminNav";

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
          <Route path='/user/:user' component={UserProfile} />
          <Route exact path='/addProject' component={AddProject} />
          <Route exact path='/chat' component={Chat} />
          <Route exact path='/projects' component={ProjectFeed} />
          <Route path='/login' component={Login} />
          <Route exact path='/projects/:projectId' component={SingleProject} />

          <Route path='/adminnav/admin' component={Admin} />
          <Route path='/adminnav' component={AdminNav} />
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
    </div>
  );
}

export default Routes;
