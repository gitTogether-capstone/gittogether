import React, { useEffect, useState } from 'react';
import supabase from '../../client';
import './ProjectModal.css';
import { NavLink } from 'react-router-dom';

const Modal = (props) => {
  const [project, setProject] = useState({});
  const currentUser = supabase.auth.user();
  const [projectUsers, setProjectUsers] = useState([]);

  useEffect(() => {
    document.addEventListener('keydown', closeProject, false);
    return function cleanup() {
      document.removeEventListener('keydown', closeProject, false);
    };
  }, []);

  function closeProject(e) {
    if (e.key === 'Escape') {
      props.onClose();
    }
  }

  useEffect(() => {
    async function fetchProj() {
      if (props.show.project) {
        let proj = await supabase
          .from('projects')
          .select('*, user!projectUser(*), projectUser(*)')
          .eq('id', props.show.project.id);
        setProject(proj.data[0]);
        let projUsers = proj.data[0].user.reduce((accum, user) => {
          accum.push(user.username);
          return accum;
        }, []);
        setProjectUsers(projUsers);
      }
    }
    fetchProj();
  }, [props.show.project]);

  if (!props.show.display) {
    return null;
  }

  if (project.user) {
    return (
      <div className="project-modal" onClick={props.onClose}>
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
          <h4 className="modal-title">{project.name}</h4>
          <div className="proj-modal-body">
            <div id="proj-desc">{project.description}</div>
            <div id="proj-users">
              Collaborators:{' '}
              {project.user.map((user, i) => {
                if (i !== project.user.length - 1) {
                  return (
                    <NavLink
                      key={i}
                      className="user-links"
                      to={`/user/${user.username}`}
                      onClick={props.onClose}
                    >{`${user.username}, `}</NavLink>
                  );
                }
                return (
                  <NavLink
                    key={i}
                    className="user-links"
                    to={`/user/${user.username}`}
                    onClick={props.onClose}
                  >{`${user.username}`}</NavLink>
                );
              })}
            </div>
          </div>
          <div className="project-date">
            <div>
              Created{' '}
              {`${props.show.project.created_at.slice(
                5,
                7
              )}/${props.show.project.created_at.slice(
                8,
                10
              )}/${props.show.project.created_at.slice(0, 4)}`}
            </div>
            {projectUsers.includes(
              currentUser.identities[0]['identity_data'].preferred_username
            ) ? (
              <NavLink to={`/projects/${project.id}`} className="proj-footer">
                Project
              </NavLink>
            ) : null}
            <a
              href={props.show.project.repoLink}
              className="github-button proj-footer"
            >
              <i className="fa fa-github" style={{ fontSize: '30px' }}></i>
              Repo
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;
