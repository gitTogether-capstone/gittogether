import React from 'react';

function ProjectRepo(props) {
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
  } else {
    return (
      <button
        className="create-repo-button"
        style={{ fontSize: '17px' }}
        onClick={(e) => props.setShowRepoCreation(true)}
      >
        Create Repo
      </button>
    );
  }
}

export default ProjectRepo;
