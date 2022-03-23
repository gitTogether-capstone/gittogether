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
      .select("*, user(id , username)")
      .eq("projectId", projectId);
    console.log("commentss", comment);
    setComments(data);
  }

  //getusers who match projects fetch?

  async function createComment() {
    await supabase.from("comments").insert([
      {
        projectId: project.id,
        body: body,
        userId: user.id,
      },
    ]);
    // console.log("user.id", user.id, "comment", comment);
    setComment({ body: "" });
    fetchComments(project.id);
    //history.push('/project/:projectId')
  }
  //  { <UserProfile />}
  console.log("comments", comments, "comment", comment);
  return !project ? (
    <div>Loading project..</div>
  ) : (
    <div className='single-project'>
      <div className='project-info'>
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
        {!project.projectUser ? (
          <div>loading projectuser</div>
        ) : (
          <img
            className='profile-picture'
            src={project.projectUser[0].user.imageUrl}
          />
        )}
        {/* <button type="button" onClick={() => {}}>Request to join</button> */}
        {/* <ProjectMessages /> */}
      </div>
      <div className='Project-messages'>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>
              {comment.user.username}: {comment.body}
            </p>
          </div>
        ))}
        <input
          id='comment-input'
          placeholder='body'
          value={body}
          onChange={(e) => setComment({ ...comment, body: e.target.value })}
        />
        <button onClick={createComment}>Post</button>
      </div>
    </div>
  );
};

export default SingleProject;
