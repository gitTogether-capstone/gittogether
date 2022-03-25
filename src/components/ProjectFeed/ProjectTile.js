import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { compareLanguages } from '../../util';
import supabase from '../../client';
import { setProjects } from '../../store/projects';
import { useDispatch } from 'react-redux';

const ProjectTile = ({
  project,
  currentUser,
  allProjects,
  sendNotification,
}) => {
  const [wasDeleted, setWasDeleted] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const dispatch = useDispatch();

  const handleClick = async () => {
    console.log(currentUser);
    //check if this user has already requested to join this project
    const existingUser = await supabase
      .from('projectUser')
      .select('*')
      .eq('projectId', project.id)
      .eq('userId', currentUser[0].id);

    //if not, send the join request

    if (existingUser.data.length === 0) {
      const { data, error } = await supabase
        .from('projectUser')
        .insert([{ userId: currentUser[0].id, projectId: project.id }]);
      setRequestMessage(
        'Success! Your request to join this project was sent, and the owner has been notified.'
      );
    } else {
      setRequestMessage(
        "You've already requested to join this project. The owner has been notified."
      );
    }
  };

  const handleDelete = async () => {
    await supabase
      .from('projectUser')
      .delete()
      .match({ projectId: project.id });
    const { data, error } = await supabase
      .from('projects')
      .delete()
      .match({ id: project.id });
    if (error) {
      console.log(error);
    } else {
      const newProjects = allProjects.filter(
        (element) => element.id !== project.id
      );
      setWasDeleted(true);
      sendNotification('Post was succesfully deleted.');
      dispatch(setProjects(newProjects));
    }
  };

  if (JSON.stringify(currentUser) === '{}') return <div></div>;
  console.log('project in tile', project);
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
                ''
              )
            ) : (
              ''
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
              <span>{project.beginnerFriendly ? 'Yes' : 'No'}</span>
            </p>
          </div>
        </div>
      )}

      {project.projectUser[0].user.id === currentUser[0].id ? (
        ''
      ) : requestMessage ? (
        <p className="request-message">
          <em>
            <strong>{requestMessage}</strong>
          </em>
        </p>
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
