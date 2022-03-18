const SET_PROJECTS = "SET_PROJECTS";

export const setProjects = (projects) => ({ type: SET_PROJECTS, projects });

const initState = [];

export default (state = initState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return action.projects;
    default:
      return state;
  }
};
