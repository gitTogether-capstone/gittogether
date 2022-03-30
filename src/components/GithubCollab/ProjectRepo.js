import React, { useState } from 'react';
import supabase from '../../client';
import { Octokit } from '@octokit/core';
import { useDispatch } from 'react-redux';
import { updateRepo } from '../../store/project';
import { addAllCollaborators } from './AddCollaborators';

function ProjectRepo(props) {
  const user = supabase.auth.user();
  const userSession = supabase.auth.session();
  const octokit = new Octokit({
    auth: userSession.provider_token,
  });
  const [repoName, setRepoName] = useState('');
  const dispatch = useDispatch();

  const verifyRepo = async (evt) => {
    try {
      let repository = repoName.split('/');
      let newreponame = repository[repository.length - 1];
      await octokit.request(`GET /repos/{owner}/{repo}`, {
        owner: userSession.user.user_metadata.user_name,
        repo: newreponame,
      });
      dispatch(updateRepo(repoName));
      await supabase
        .from('projects')
        .update({ repoLink: repoName })
        .eq('id', props.project.id);
    } catch (err) {
      alert('You can not provide a repository you are not the owner of.');
    }
  };

  const unlistRepo = async (evt) => {
    await supabase
      .from('projects')
      .update({ repoLink: '' })
      .eq('id', props.project.id);
    dispatch(updateRepo(''));
  };

  const addProjectCollaborators = async (evt) => {
    let proj = await supabase
      .from('projects')
      .select('*, projectUser(*), user!projectUser(*)')
      .eq('id', props.project.id);
    addAllCollaborators(proj, user.user_metadata.user_name);
  };

  if (props.project.repoLink) {
    if (user.id === props.project.projectUser[0].user.id) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1f2833',
            minWidth: '700px',
            maxWidth: '800px',
          }}
        >
          <a
            id="github-link"
            href={props.project.repoLink}
            className="github-button"
            target={'_blank'}
            rel={'noreferrer'}
          >
            <i className="fa fa-github"></i>
            <h2 className="github-link">Github</h2>
          </a>
          <button
            className="create-repo-button"
            onClick={(e) => addProjectCollaborators(e)}
          >
            Add Collaborators
          </button>
          <button className="create-repo-button" onClick={unlistRepo}>
            Unlist Repo
          </button>
        </div>
      );
    } else {
      return (
        <a
          id="github-link"
          href={props.project.repoLink}
          className="github-button"
          target={'_blank'}
          rel={'noreferrer'}
        >
          <i className="fa fa-github"></i>
          <h2 className="github-link">Github</h2>
        </a>
      );
    }
  } else if (
    props.project.id &&
    user.id === props.project.projectUser[0].user.id
  ) {
    return (
      <div
        id="no-repo"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button
          className="create-repo-button"
          style={{ fontSize: '17px', width: 'fit-content' }}
          onClick={(e) => props.setShowRepoCreation(true)}
        >
          Create Repo
        </button>
        <div>
          <input
            name="name"
            type="text"
            className="repo-form-input"
            required
            maxLength={100}
            onChange={(e) => setRepoName(e.target.value)}
          ></input>
          <button className="create-repo-button" onClick={(e) => verifyRepo(e)}>
            Add Repo
          </button>
        </div>
      </div>
    );
  } else {
    return <div>This project has no repo yet.</div>;
  }
}

export default ProjectRepo;
