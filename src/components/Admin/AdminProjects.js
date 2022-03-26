import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import supabase from "../../client";
import { Link } from "react-router-dom";
import "./Admin.css";
import AdminSingleProject from "./AdminSingleProject";
// import { setUser, setProjects } from "../../store";
// import SingleProject from "../SingleProject/SingleProject";

const AdminProjects = () => {
  const [user, setUser] = useState([]);
  const [projects, setProjects] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.from("user").select("*");
      console.log("data", { data });
      setUser(data);
    }
    fetchUser();
  }, []);
  console.log("user", user);
  console.log("projects", projects);

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase.from("projects").select("*");
      console.log("data", { data });
      setProjects(data);
    }
    fetchProjects();
  }, []);

  // const handleDelete = (e) => {
  //   fetch user delete user
  // }
  return (
    <>
      {!projects ? (
        <div>Loading projects...</div>
      ) : (
        projects.map((project) => (
          <Link to={`/AdminProjects/${project.id}`}>
            <div key={project.id}>
              <div>Name: {project.name}</div>
              <div>Description: {project.description}</div>
              <a href={project.repoLink}>Github Repository</a>
            </div>
            {/* <SingleProject component={SingleProject} /> */}
          </Link>
        ))
      )}
    </>
  );
};

export default AdminProjects;
