import React, { useState } from 'react';
import { Octokit } from '@octokit/core';
import supabase from '../../client';
import { updateRepo } from '../../store/project';
import { useDispatch } from 'react-redux';
import { addAllCollaborators } from '../GithubCollab/AddCollaborators';

function CreateRepo(props) {
  const userSession = supabase.auth.session();
  const dispatch = useDispatch();
  const octokit = new Octokit({
    auth: userSession.provider_token,
  });
  const [repoName, setRepoName] = useState('');
  const [repoVisibility, setRepoVisibility] = useState(false);

  async function createRepo(evt) {
    evt.preventDefault();
    try {
      let newRepo = await octokit.request('POST /user/repos', {
        name: repoName,
        visibility: repoVisibility,
      });
      let { data, err } = await supabase
        .from('projects')
        .update([{ repoLink: newRepo.data['html_url'] }])
        .eq('id', props.project.id);
      dispatch(updateRepo(newRepo.data['html_url']));
      props.onClose();
    } catch (err) {
      let message = err.message.indexOf(`message":`) + 10;
      let error = err.message.slice(message, err.message.indexOf('}') - 1);
      alert(error);
    }
  }

  if (props.showRepoCreation) {
    return (
      <div className="create-repo-modal" onClick={props.onClose}>
        <div className="modal-footer">
          <button
            style={{ cursor: 'pointer' }}
            onClick={props.onClose}
            className="button"
          >
            X
          </button>
        </div>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h4 className="modal-title" style={{ fontSize: '50px' }}>
            GitHub Repository Form
          </h4>
          <div>
            <div id="proj-desc">
              <form id="create-repo-form" onSubmit={(evt) => createRepo(evt)}>
                <div>
                  {' '}
                  <div className="create-repo-form">
                    <label className="form-labels" htmlFor="name">
                      Name
                    </label>
                  </div>
                  <input
                    name="name"
                    type="text"
                    className="repo-form-input"
                    required
                    maxLength={100}
                    onChange={(evt) => setRepoName(evt.target.value)}
                  ></input>
                </div>
                <div>
                  <div>
                    <label className="form-labels" htmlFor="repo-privacy-field">
                      Repo Visibility
                    </label>
                  </div>
                  <select
                    id="repo-privacy-field"
                    onChange={(e) =>
                      setRepoVisibility(
                        e.target.value === 'true' ? true : false
                      )
                    }
                  >
                    <option className="repo-privacy-option" value={false}>
                      Public
                    </option>
                    <option className="repo-privacy-option" value={true}>
                      Private
                    </option>
                  </select>
                </div>
                <button className="create-repo-button" type="submit">
                  Create Repository
                </button>
                <h5 id="create-repo-warning">
                  Creating this repo will add any current project members as
                  collaborators.
                </h5>
              </form>
            </div>
            <div id="proj-users"></div>
          </div>
          <div className="project-date"></div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default CreateRepo;
