import React, { useState } from "react";
import { Link } from "react-router-dom";
import { compareLanguages } from "../../util";
import supabase from "../../client";

const ProjectTile = ({ project, currentUser }) => {
  const [wasDeleted, setWasDeleted] = useState(false);

  const handleClick = async () => {
    console.log(currentUser);
    const { data, error } = await supabase
      .from("projectUser")
      .insert([{ userId: currentUser[0].id, projectId: project.id }]);
  };

  const handleDelete = async () => {
    await supabase
      .from("projectUser")
      .delete()
      .match({ projectId: project.id });
    const { data, error } = await supabase
      .from("projects")
      .delete()
      .match({ id: project.id });
    if (error) {
      console.log(error);
    } else {
      setWasDeleted(true);
    }
  };

  if (JSON.stringify(currentUser) === "{}") return <div></div>;
  return (
    <div key={project.id} className="project-tile" id={project.id}>
      {wasDeleted ? (
        <p>
          <em>This post has been deleted</em>
        </p>
      ) : (
        <div>
          <div className="tile-header">
            <div className="project-owner">
              <img src={project.projectUser[0].user.imageUrl} />
              <Link to={`/user/${project.projectUser[0].user.username}`}>
                <strong>@{project.projectUser[0].user.username}</strong>
              </Link>
            </div>
            {project.projectUser[0].user.id === currentUser[0].id ? (
              !wasDeleted ? (
                <button onClick={handleDelete} className="delete-button">
                  <strong>X</strong>
                </button>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          <Link to={`/projects/${project.id}`}>
            <p>
              <strong>{project.name}</strong>
            </p>
            <p>{project.description}</p>
          </Link>
          <div className="project-details">
            <p>
              <strong>Language: </strong>
              {project.languages.name}
            </p>
            <p>
              <strong>Category: </strong>
              <span>{project.categories.name}</span>
            </p>
            <p>
              <strong>Beginner Friendly: </strong>
              <span>{project.beginnerFriendly ? "Yes" : "No"}</span>
            </p>
          </div>
        </div>
      )}

      {project.projectUser[0].user.id === currentUser[0].id ? (
        ""
      ) : (
        <div>
          <button
            className="request-to-collab"
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
              You don't have the required languages on your profile. Spend some
              time learning them first, or look for a beginner friendly project.
            </em>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectTile;
