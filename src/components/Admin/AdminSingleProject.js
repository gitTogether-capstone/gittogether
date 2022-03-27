import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../../store/project";
import { Link } from "react-router-dom";
import "./AdminSingleProject.css";
import supabase from "../../client";

const AdminSingleProject = (props) => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({ body: "" });
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState([]);
  const [wasDeleted, setWasDeleted] = useState("");

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
    console.log("comments data", data);
    setComments(data);
  }

  async function fetchUsers(projectId) {
    let { data } = await supabase
      .from("projectUser")
      .select(`*, user(id , username)"`)
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

  return !project ? (
    <div>Loading project..</div>
  ) : (
    <div className='single-project'>
      <div className='display-flex'>
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
            <div>
              <button className='post-button' onClick={handleDelete}>
                Delete Project
              </button>
            </div>
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
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='Project-messages'>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>
              {/* <b>{comment.user.username}: </b> */}

              {comment.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSingleProject;
