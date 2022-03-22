import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../../store/project";
// import { fetchComments } from "../../store/comments";
import ProjectMessages from "../ProjectMessages";
import "./SingleProject.css";
import supabase from "../../client";

const SingleProject = (props) => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  // const comments = useSelector((state) => state.comments);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({ body: "" });
  const user = useSelector((state) => state.user);
  console.log("user", user);
  const { body } = comment;
  const projectId = project.id;
  useEffect(() => {
    dispatch(fetchProject(props.match.params.projectId));
    // const fetchComments = async () => {
    //   const { data, error } = await supabase
    //     .from("comments")
    //     .select("*")
    //     .eq("projectId", props.match.params.projectId);
    //   setComments(data);
    // };
    fetchComments(props.match.params.projectId);
    console.log("comments??", comments);
    console.log("project", project);
  }, []);

  async function fetchComments(projectId) {
    console.log(project);
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("projectId", projectId);
    console.log("data??", data);
    setComments(data);
    console.log("data", data);
  }
  async function createComment() {
    console.log("project?", project);
    console.log("project id", project.id, "body", body);
    console.log("props", props);
    await supabase
      .from("comments")
      .insert([{ projectId: project.id, body: body, userId: user.id }]);
    // .single();
    setComment({ body: "" });
    fetchComments(project.id);
  }
  return !project ? (
    <div>Loading project..</div>
  ) : (
    <div className="single-project">
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
      {/* <ProjectMessages /> */}
      <div className="Project-messages">
        <input
          placeholder="body"
          value={body}
          onChange={(e) => setComment({ ...comment, body: e.target.value })}
        />
        <button onClick={createComment}>Post</button>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.body}</p>
          </div>
        ))}
        <div>Hi, I'm your project messages</div>;
      </div>
    </div>
  );
};

export default SingleProject;
