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
import UserProfile from "../UserProfile/UserProfile";
import { toast } from "react-toastify";

const SingleProject = (props) => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({ body: "" });
  const [requestMessage, setRequestMessage] = useState("");
  const [wasDeleted, setWasDeleted] = useState("");
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState([]);
  const currentUser = supabase.auth.user();
  const [current, setCurrent] = useState([]);
  const isAdmin = false;
  //const currentUser = useSelector((state) => state.user);
  const { body } = comment;
  const [showRepoCreation, setShowRepoCreation] = useState(false);

  useEffect(() => {
    fetchCurrent();
  }, [currentUser]);

  useEffect(() => {
    dispatch(fetchProject(props.match.params.projectId));
    fetchComments(props.match.params.projectId);
    fetchUsers(props.match.params.projectId);
  }, []);

  async function fetchComments(projectId) {
    const { data } = await supabase
      .from("comments")
      .select("*, user(id , username, imageUrl)")
      .eq("projectId", projectId);

    setComments(data);
  }
  async function fetchCurrent() {
    if (currentUser) {
      const { data } = await supabase
        .from("user")
        .select("*")
        .eq("id", currentUser.id);
      setCurrent(data);
    }
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

  async function createConversation() {
    const conversation = await supabase.from("conversation").insert([
      {
        conversation_name: project.name,
        projectId: project.id,
      },
    ]);
    if (conversation.error) {
      toast("Group conversation already exists");
    } else {
      user.map(async (member) => {
        const { error } = await supabase.from("conversation_member").insert([
          {
            user_id: member.user.id,
            conversation_id: conversation.data[0].conversation_id,
          },
        ]);
        if (error) {
          console.log("ERROR", error);
        }
      });
    }
  }

  async function fetchUsers(projectId) {
    let { data } = await supabase
      .from("projectUser")
      .select(`*, user(id , username, bio)"`)
      .eq("projectId", projectId);

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
    const existingUser = await supabase
      .from("projectUser")
      .select("*")
      .eq("projectId", project.id)
      .eq("userId", currentUser.id);

    if (existingUser.data.length === 0) {
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
  console.log("current", current);
  return !project ? (
    <div>Loading project..</div>
  ) : (
    <div className='single-project'>
      <div className='title'>
        <h1>{project.name}</h1>
        {!project.projectUser ? null : (
          <Link to={`/user/${project.projectUser[0].user.username}`}>
            <img
              className='profile-picture'
              src={project.projectUser[0].user.imageUrl}
            />
            <p>{project.projectUser[0].user.username}</p>
            <p>{project.projectUser[0].user.bio}</p>
          </Link>
        )}
        <div>
          {current.length === 0 ? null : !current[0].isAdmin ? null : (
            <div>
              <button className='post-button' onClick={handleDelete}>
                Delete Project
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='row'>
        <div className='display-flex'>
          {/* <div className='project-tiles'>
          {!project.projectUser ? <div>loading project member... </div> : null}
        </div> */}
          {/* <div className='project-tiles'></div> */}
        </div>
        <div className='display-flex-column'>
          <div className='display-flex'>
            <div className='project-tiles'>
              <h2>Project Description</h2>
              {project.description}
              <p>
                <b>Beginner Friendly: </b>
                {project.beginnerFriendly ? "Yes" : "No"}
              </p>
              <h2>Language</h2>
              {project.languages ? project.languages.name : ""}
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
            </div>
            <div className='project-tiles'>
              <h2>Current Team Members of Project:</h2>

              {!user ? (
                <div>Loading group members...</div>
              ) : (
                <div>
                  <div className='members'>
                    {user.map((use) => {
                      if (use.isAccepted) {
                        return (
                          <div key={use.id} className='users'>
                            <br />
                            <div> {use.user.username} </div>
                            <div>
                              {use.user.bio ? `Bio: ${use.user.bio}` : null}{" "}
                            </div>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                  {/* 
              {project.projectUser[0].userId === currentUser?.id ? (
                ""
              ) : requestMessage ? (
                <p className='request-message'>
                  <em>
                    <strong>{requestMessage}</strong>
                  </em>
                </p>
              ) : ( */}
                  <>
                    <button
                      className='request-to-collab'
                      onClick={createConversation}
                    >
                      Create Conversation
                    </button>
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
                          You don't have the required languages on your profile.
                          Spend some time learning them first, or look for a
                          beginner friendly project.
                        </em>
                      </p>
                    </div>
                  </>
                  {/* )} */}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='Project-messages'>
          <div className='messages'>
            {comments.map((comment) => (
              <div key={comment.id}>
                <p>
                  <img
                    className='comment-picture'
                    src={comment.user.imageUrl}
                  />
                  <b>{comment.user.username}: </b>
                  {comment.body}
                </p>
              </div>
            ))}
          </div>
          <br />
          <br />
          <br />
          <div className='text-box'>
            <input
              id='comment-input'
              placeholder='post a comment about this project'
              value={body}
              onChange={(e) => setComment({ ...comment, body: e.target.value })}
            />
            <br />
            <button id='post' onClick={createComment}>
              Post
            </button>
            <br />
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default SingleProject;
