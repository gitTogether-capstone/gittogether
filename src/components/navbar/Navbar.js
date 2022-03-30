import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../store/user";
import { Link } from "react-router-dom";
import "./navbar.scss";
import AddIcon from "@mui/icons-material/Add";
import Notifications from "./Notifications";
import DropdownMenu from "./DropdownMenu/DropdownMenu.js";
import Popup from "../AddProject/Popup";
import supabase from "../../client";
import { ToastContainer, toast } from "react-toastify";
import { fetchMyProjects } from "../../util";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import SearchBox from "./SearchBox";
import SearchDropdown from "./SearchDropdown/SearchDropdown";

import AdminPopup from "../Admin/AdminAdd/AdminPopup";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [projectIds, setProjectIds] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [AdminbuttonPopup, setAdminButtonPopup] = useState(false);
  const currentUser = supabase.auth.user();
  const [current, setCurrent] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const history = useHistory();

  const logout = () => {
    dispatch(signOut());
    history.push("/");
  };

  useEffect(() => {
    fetchCurrent();
  }, [currentUser]);

  useEffect(() => {
    if (!!user && user.id) {
      const getAllProjects = async () => {
        const myProjects = await fetchMyProjects(user.id);
        setProjectIds(myProjects);
      };
      getAllProjects();
    }
  }, [user]);

  useEffect(() => {
    const handleInserts = (payload) => {
      const callback = async () => {
        if (projectIds.includes(payload.new.projectId)) {
          const { data, error } = await supabase
            .from("user")
            .select("id, username")
            .eq("id", payload.new.userId);
          if (error) console.log(error);
          toast(`@${data[0].username} wants to join your project`);
        }
      };
      callback();
    };

    const handleUpdates = (payload) => {
      const callback = async () => {
        const { data } = await supabase
          .from("projects")
          .select("id, name")
          .eq("id", payload.new.projectId);
        toast(`Your request to join ${data[0].name} has been accepted!`);
      };
      callback();
    };

    if (!!user && user.id) {
      const projectUser = supabase
        .from("projectUser")
        .on("INSERT", handleInserts)
        .subscribe();
      const projectUserUpdates = supabase
        .from(`projectUser:userId=eq.${user.id}`)
        .on("UPDATE", handleUpdates)
        .subscribe();
    }
  }, [projectIds]);

  async function fetchCurrent() {
    if (currentUser) {
      const { data } = await supabase
        .from("user")
        .select("*")
        .eq("id", currentUser.id);
      setCurrent(data);
    }
  }

  return (
    <div className='navBar'>
      <div className='leftNav'>
        <Link to='/' className='logo'>
          gitTogether
        </Link>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
          toastStyle={{
            backgroundColor: "#45a29e",
            color: "white",
            boxShadow: "5px 10px 10px black",
          }}
          progressStyle={{ backgroundColor: "#1f2833" }}
        />
        {!current.isAdmin ? null : (
          <div className='Admin-Add'>
            <button onClick={() => setAdminButtonPopup(true)}>
              Add Language
            </button>
            <AdminPopup
              trigger={AdminbuttonPopup}
              setTrigger={setAdminButtonPopup}
            >
              <h4>Add Language</h4>
            </AdminPopup>
          </div>
        )}
      </div>
      {user?.id ? (
        <div className='rightNav'>
          <div className='itemContainer'>
            <Link to='/chat' className='messages-link'>
              <span>Chat</span>
            </Link>
          </div>
          <div className='itemContainer'>
            <AddIcon onClick={() => setButtonPopup(true)} className='icon' />
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}></Popup>
          </div>
          <div className='itemContainer'>
            <Notifications
              openSearch={setOpenSearch}
              openNotifications={setOpenNotifications}
              open={openNotifications}
            >
              <DropdownMenu user={user} />
            </Notifications>
          </div>
          <div className='itemContainer'>
            <SearchBox
              openSearch={setOpenSearch}
              openNotifications={setOpenNotifications}
              open={openSearch}
            >
              <SearchDropdown />
            </SearchBox>
          </div>
          <div className='img-div'>
            <Link to={`/user/${user.identities[0]["identity_data"].user_name}`}>
              <img
                className='profilePic'
                src={user.user_metadata.avatar_url}
                alt='profile'
              />
            </Link>{" "}
          </div>
          {current.length === 0 ? null : !current[0].isAdmin ? null : (
            <div>
              <button onClick={() => setAdminButtonPopup(true)}>
                Add Category
              </button>
              <AdminPopup
                trigger={AdminbuttonPopup}
                setTrigger={setAdminButtonPopup}
              >
                <h4>Add Category</h4>
              </AdminPopup>
            </div>
          )}
          <div className='button-div'>
            <button className='logButton' onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Link to='/login'>
          <button className='logButton'>Login</button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
