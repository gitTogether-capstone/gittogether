import React, { useEffect, useState } from "react";
import supabase from "../../client";
import { Link } from "react-router-dom";
import "./Admin.css";
import "./AdminProjects.css";

const AdminProjects = () => {
  const [user, setUser] = useState([]);
  const [projects, setProjects] = useState([]);

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

  return (
    <div className='all-projects'>
      {!projects ? (
        <div>Loading projects...</div>
      ) : (
        projects.map((project) => (
          <Link to={`/AdminProjects/${project.id}`}>
            <div key={project.id}>
              <div className='title-tile'>
                <b>Name: {project.name}</b>
              </div>
              <div className='description-tile'>
                Description: {project.description}
                <a href={project.repoLink}>Github Repository</a>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default AdminProjects;
