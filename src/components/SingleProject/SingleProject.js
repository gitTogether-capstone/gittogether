import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../../store/project";
import { fetchComments } from "../../store/comments";
import { compareLanguages } from "../../util";
import { Link } from "react-router-dom";
import "./SingleProject.css";
import supabase from "../../client";
import ProjectRepo from "../GithubCollab/ProjectRepo";
import CreateRepo from "../GithubCollab/RepoCreation";

const SingleProject = (props) => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({ body: "" });
  const [requestMessage, setRequestMessage] = useState("");
  const [wasDeleted, setWasDeleted] = useState("");
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState([]);
  const isAdmin = false;
  const currentUser = useSelector((state) => state.user);
  const { body } = comment;
  const [showRepoCreation, setShowRepoCreation] = useState(false);

  useEffect(() => {
    dispatch(fetchProject(props.match.params.projectId));
    fetchComments(props.match.params.projectId);
    fetchUsers(props.match.params.projectId);
  }, []);

  async function fetchComments(projectId) {
    console.log(project);
    const { data } = await supabase
      .from("comments")
      .select("*, user(id , username, imageUrl)")
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
    setComment({ body: "" });
    fetchComments(project.id);
  }

  async function fetchUsers(projectId) {
    let { data } = await supabase
      .from("projectUser")
      .select(`*, user(id , username, bio)"`)
      .eq("projectId", projectId);
    console.log("dataaaa", data);
    setUser(data);
  }
  const handleDelete = async () => {
    await supabase
      .from("projectUser")
      .delete()
      .match({ projectId: project.id });
    const { data, error } = await supabase
      .from("projects")
      .delete()
      .match({ id: project.id });
    setWasDeleted(true);
    setProjects();
  };

  const handleClick = async () => {
    console.log("current user", currentUser);
    const existingUser = await supabase
      .from("projectUser")
      .select("*")
      .eq("projectId", project.id)
      .eq("userId", currentUser.id);

    if (existingUser.data.length === 0) {
      // o: none of these variables are being used???
      const { data, error } = await supabase
        .from("projectUser")
        .insert([{ userId: currentUser.id, projectId: project.id }]);
      setRequestMessage(
        "Success! Your request to join this project was sent, and the owner has been notified."
      );
    } else {
      setRequestMessage(
        "You've already requested to join this project. The owner has been notified."
      );
    }
  };

  // o: remove if done testing
  console.log("isAdmin", user);
  return !project ? (
    <div>Loading project..</div>
  ) : (
    <div className='single-project'>
      <div className='project-info'>
        {!project.projectUser ? (
          <div>loading projectuser</div>
        ) : (
          <div>
            <br />
            <label>Project Lead:</label>
            <br />
            <Link to={`/user/${project.projectUser[0].user.username}`}>
              <img
                className='profile-picture'
                src={project.projectUser[0].user.imageUrl}
              />
              <p>{project.projectUser[0].user.username}</p>
              <p>{project.projectUser[0].user.bio}</p>
            </Link>
            {/* o: negations are harder to read */}
            {!isAdmin ? null : (
              <div>
                <button className='post-button' onClick={handleDelete}>
                  Delete Project
                </button>
              </div>
            )}
          </div>
        )}
        <div>
          <h1>{project.name}</h1>
        </div>
      </div>
      <div className='project-tile-wider'>
        <h2>Project Description</h2>
        {project.description}
        <p>
          <b>Beginner Friendly: </b>
          {project.beginnerFriendly ? "Yes" : "No"}
        </p>
      </div>
      <div className='display-flex'>
        <div className='project-tiles'>
          <h2>Language</h2>
          {project.languages ? project.languages.name : ""}
          <a href={project.repoLink}>
            <h2>Github Repository</h2>
          </a>
        </div>
        <div className='project-tiles'>
          <h2>Current Team Members of Project:</h2>

          {!user ? (
            <div>Loading group members...</div>
          ) : (
            <div>
              <div className='members'>
                {user.map((use) => (
                  <div key={use.id} className='users'>
                    <br />
                    <div> {use.user.username} </div>
                    <div> Bio: {use.user.bio} </div>
                  </div>
                ))}
              </div>
              {/* {project.projectUser[0].userId === currentUser.id ? (
                ""
              ) : requestMessage ? (
                <p className='request-message'>
                  <em>
                    <strong>{requestMessage}</strong>
                  </em>
                </p>
              ) : ( */}
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
                <p
                  hidden={
                    !(
                      compareLanguages(currentUser, project) &&
                      !project.beginnerFriendly
                    )
                  }
                >
                  <em>
                    You don't have the required languages on your profile. Spend
                    some time learning them first, or look for a beginner
                    friendly project.
                  </em>
                </p>
              </div>
              {/* )} */}
            </div>
          )}
        </div>
      </div>
      <ProjectRepo
        onClose={(e) => setShowRepoCreation(false)}
        project={project}
        setShowRepoCreation={setShowRepoCreation}
      />
      <br />
      <CreateRepo
        showRepoCreation={showRepoCreation}
        onClose={(e) => setShowRepoCreation(false)}
        project={project}
      />
      <div className='Project-messages'>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>
              <b>{comment.user.username}: </b>
              {comment.body}
            </p>
          </div>
        ))}
        <br />
        <br />
        <br />
        <input
          id='comment-input'
          placeholder='post a comment about this project'
          value={body}
          onChange={(e) => setComment({ ...comment, body: e.target.value })}
        />
        <br />
        <button className='post-button' onClick={createComment}>
          Post
        </button>
        <br />
      </div>
      <br />
    </div>
  );
};

export default SingleProject;
