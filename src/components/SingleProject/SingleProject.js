import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../../store/project";
import { fetchComments } from "../../store/comments";
import { compareLanguages } from "../../util";
import { Link } from "react-router-dom";
import "./SingleProject.css";
import supabase from "../../client";

const SingleProject = (props) => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({ body: "" });
  const [requestMessage, setRequestMessage] = useState("");
  const [user, setUser] = useState([]);
  const currentUser = useSelector((state) => state.user);
  const { body } = comment;
  useEffect(() => {
    dispatch(fetchProject(props.match.params.projectId));
    fetchComments(props.match.params.projectId);
    fetchUsers(props.match.params.projectId);
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

  async function createComment() {
    await supabase.from("comments").insert([
      {
        projectId: project.id,
        body: body,
        userId: currentUser.id,
      },
    ]);
    // console.log("user.id", user.id, "comment", comment);
    setComment({ body: "" });
    fetchComments(project.id);
    //history.push('/project/:projectId')
  }

  async function fetchUsers(projectId) {
    let { data } = await supabase
      .from("projectUser")
      .select(`*, user(id , username)"`)
      .eq("projectId", projectId);
    console.log("dataaaa", data);
    setUser(data);
  }
  console.log("users", user);
  //  { <UserProfile />}

  // const handleClick = async () => {
  //   console.log(currentUser);
  //   //check if this user has already requested to join this project
  //   const existingUser = await supabase
  //     .from("projectUser")
  //     .select("*")
  //     .eq("projectId", project.id)
  //     .eq("userId", currentUser[0].id);

  //   //if not, send the join request

  //   if (existingUser.data.length === 0) {
  //     const { data, error } = await supabase
  //       .from("projectUser")
  //       .insert([{ userId: currentUser[0].id, projectId: project.id }]);
  //     setRequestMessage(
  //       "Success! Your request to join this project was sent, and the owner has been notified."
  //     );
  //   } else {
  //     setRequestMessage(
  //       "You've already requested to join this project. The owner has been notified."
  //     );
  //   }
  // };

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
        <span>
          Beginner Friendly: {project.benginnerFriendly ? "Yes" : "No"}
        </span>
        <br />
        <a href={project.repoLink}>Github Repository</a>
        <br />
        {!user ? (
          <div>Loading group members...</div>
        ) : (
          <div>
            <label>Team Members:</label>
            <div className='members'>
              {user.map((use) => (
                <div key={use.id} className='users'>
                  <br />
                  <div> Username: {use.user.username} </div>
                  <br />
                  {/* <div> Email: {use.user.email} </div>
                <br />
                <div> Bio: {use.user.bio} </div> */}
                </div>
              ))}
            </div>
          </div>
        )}
        {!project.projectUser ? (
          <div>loading projectuser</div>
        ) : (
          <div>
            <label>Project Lead:</label>
            <Link to={`/user/{user.id}`}>
              <img
                className='profile-picture'
                src={project.projectUser[0].user.imageUrl}
              />
              <p>{project.projectUser[0].user.username}</p>
              <p>{project.projectUser[0].user.bio}</p>
            </Link>
          </div>
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <input
          id='comment-input'
          placeholder='body'
          value={body}
          onChange={(e) => setComment({ ...comment, body: e.target.value })}
        />

        <button className='post-button' onClick={createComment}>
          Post
        </button>
        <br />
        <br />
      </div>
      {/* {project.projectUser[0].user.id === currentUser[0].id ? (
        ""
      ) : (
        <div>
          <button
            className='request-to-collab'
            disabled={
              compareLanguages(currentUser, project) &&
              !project.beginnerFriendly
            }
            onClick={handleClick}
          >
            <strong>Request to Collab</strong>
          </button>
          <p>
            <em>{requestMessage}</em>
          </p>
          <p
            hidden={
              !(
                compareLanguages(currentUser, project) &&
                !project.beginnerFriendly
              )
            }
          >
            <em>
              You don't have the required languages on your profile. Spend some
              time learning them first, or look for a beginner friendly project.
            </em>
          </p>
        </div>
      )} */}
    </div>
  );
};

export default SingleProject;
