import React from 'react';
import supabase from '../../client';

function ProjectRepo(props) {
  const user = supabase.auth.user();
  console.log(props);
  console.log(user);
  if (props.project.repoLink) {
    return (
      <a
        id="github-link"
        href={props.project.repoLink}
        className="github-button"
        target={'_blank'}
      >
        <i className="fa fa-github"></i>
        <h2 className="github-link">Github</h2>
      </a>
    );
  } else if (user.id === props.project.projectUser[0].user.id) {
    return (
      <button
        className="create-repo-button"
        style={{ fontSize: '17px' }}
        onClick={(e) => props.setShowRepoCreation(true)}
      >
        Create Repo
      </button>
    );
  } else {
    return <div>This project has no repo yet.</div>;
  }
}

export default ProjectRepo;
