import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../store/projects";
import { Link } from "react-router-dom";
import supabase from "../client";

const dummyData = [
  {
    name: "Example project One",
    description: "this is the example description",
    repoLink: "https://github.com/gitTogether-capstone/gittogether",
    beginnerFriendly: true,
  },
  {
    name: "Example project Two",
    description: "this is the example description",
    repoLink: "https://github.com/gitTogether-capstone/gittogether",
    beginnerFriendly: false,
  },
  {
    name: "Example project Three",
    description: "this is the example description",
    repoLink: "https://github.com/gitTogether-capstone/gittogether",
    beginnerFriendly: true,
  },
  {
    name: "Example project Four",
    description: "this is the example description",
    repoLink: "https://github.com/gitTogether-capstone/gittogether",
    beginnerFriendly: false,
  },
  {
    name: "Example project Five",
    description: "this is the example description",
    repoLink: "https://github.com/gitTogether-capstone/gittogether",
    beginnerFriendly: true,
  },
];

const ProjectFeed = () => {
  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
    console.log(projects);
  }, []);
  return (
    <div>
      {projects.length ? (
        projects.map((project) => {
          return (
            <div key={project.id}>
              <Link to={`/${project.id}`}>
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
  );
};

export default ProjectFeed;
