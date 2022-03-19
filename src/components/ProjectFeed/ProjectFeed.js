import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../store/projects";
import supabase from "../../client";
import { filterProjects } from "../../util";
import "./ProjectFeed.css";
import { Link } from "react-router-dom";

const ProjectFeed = () => {
  const [filters, setFilters] = useState({
    beginnerFriendly: false,
  });
  const projects = useSelector((state) =>
    filterProjects(state.projects, filters)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.checked });
  };

  return (
    <div className="project-feed">
      <div className="project-filters">
        <h1>Filters</h1>
        <h2>Beginner Friendly</h2>
        <div className="input-element">
          <input
            name="beginnerFriendly"
            type="checkbox"
            onChange={handleChange}
          />
          <label htmlFor="beginnerFriendly">Beginner Friendly</label>
        </div>
      </div>
      <div className="project-list">
        {projects.length ? (
          projects.map((project) => {
            return (
              <div key={project.id}>
                <Link to={`${project.id}`}>
                  <h1>{project.name}</h1>
                  <p>{project.description}</p>
                </Link>
              </div>
            );
          })
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
};

export default ProjectFeed;
