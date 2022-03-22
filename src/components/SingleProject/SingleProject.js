import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../../store/project";
import { fetchComments } from "../../store/comments";
import "./SingleProject.css";
import supabase from "../../client";

const SingleProject = (props) => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({ body: "" });
  const user = useSelector((state) => state.user);
  const username = user.email;
  console.log("user", user);
  const { body } = comment;
  useEffect(() => {
    dispatch(fetchProject(props.match.params.projectId));
    fetchComments(props.match.params.projectId);
  }, []);

  async function fetchComments(projectId) {
    console.log(project);
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("projectId", projectId);
    setComments(data);
  }

  async function createComment() {
    await supabase.from("comments").insert([
      {
        projectId: project.id,
        body: body,
        userId: user.id,
        username: username,
      },
    ]);
    console.log("user.id", user.id, "comment", comment);
    setComment({ body: "" });
    fetchComments(project.id);
  }
  console.log("comments", comments, "comment", comment);
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
      {/* <p>Project Owner: {project.ownerId}</p> */}
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
            <p>
              {comment.username}: {comment.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleProject;
