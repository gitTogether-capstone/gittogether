import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../store/project";

const SingleProject = (props) => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchProject(props.match.params.projectId));
    console.log("project", project);
  }, []);
  // console.log("props.match.params", props.match.params.projectId);
  return !project ? (
    <div>Loading...</div>
  ) : (
    <>
      <br />
      <br />
      <h2>Name: {project.name}</h2>
      <br />
      <p>Description: {project.description}</p>
      <br />
      <p>Beginner Friendly?: {project.benginnerFriendly ? "Yes" : "No"}</p>
      <br />
      <a href={project.repoLink}>Github Repository</a>
      <br />
      <p>Project Owner: {project.ownerId}</p>
      {/* <button type="button" onClick={() => {}}>Request to join</button> */}
    </>
  );
};

export default SingleProject;
