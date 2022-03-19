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
      <div>Name: {project.name}</div>
      <div>Description: {project.description}</div>
      <div>Beginner Friendly?: {project.benginnerFriendly ? "Yes" : "No"}</div>
      <div>Github Repository: {project.repoLink}</div>
      <div>Project Owner: {project.ownerId}</div>
      {/* <button type="button" onClick={() => {}}>Request to join</button> */}
    </>
  );
};

export default SingleProject;
