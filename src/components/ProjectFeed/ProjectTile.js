import React from "react";
import { Link } from "react-router-dom";
import { compareLanguages } from "../../util";
import supabase from "../../client";

const ProjectTile = ({ project, currentUser }) => {
  const handleClick = async () => {
    console.log(currentUser);
    const { data, error } = await supabase
      .from("projectUser")
      .insert([{ userId: currentUser[0].id, projectId: project.id }]);
  };

  return (
    <div key={project.id} className="project-tile">
      <div className="project-owner">
        <img src={project.projectUser[0].user.imageUrl} />
        <Link to={`/user/${project.projectUser[0].user.username}`}>
          <strong>@{project.projectUser[0].user.username}</strong>
        </Link>
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
      <button
        className="request-to-collab"
        disabled={
          compareLanguages(currentUser, project) && !project.beginnerFriendly
        }
        onClick={handleClick}
      >
        <strong>Request to Collab</strong>
      </button>
      <span
        hidden={
          !(compareLanguages(currentUser, project) && !project.beginnerFriendly)
        }
      >
        <em>
          You don't have the required languages on your profile. Spend some time
          learning them first, or look for a beginner friendly project.
        </em>
      </span>
    </div>
  );
};

export default ProjectTile;
