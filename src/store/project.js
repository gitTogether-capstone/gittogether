import supabase from '../client';
const GET_PROJECT = 'GET_PROJECT';
const UPDATE_REPO = 'UPDATE_REPO';

export const getProject = (project) => {
  return {
    type: GET_PROJECT,
    project,
  };
};

export const updateRepo = (repo) => {
  return {
    type: UPDATE_REPO,
    repo,
  };
};

export const fetchProject = (id) => {
  return async (dispatch) => {
    let { data: project, error } = await supabase
      .from('projects')
      .select(
        `*,
      languages (id, name),
      categories (id, name),
      projectUser(*, user(id, username, imageUrl))
      `
      )
      .eq('id', id)
      .eq('projectUser.isOwner', true)
      .single();
    dispatch(getProject(project));
  };
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT:
      return action.project;
    case UPDATE_REPO:
      return { ...state, repoLink: action.repo };
    default:
      return state;
  }
};
