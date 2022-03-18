import supabase from "../client";
const SET_PROJECTS = "SET_PROJECTS";

export const setProjects = (projects) => ({ type: SET_PROJECTS, projects });

export const fetchProjects = () => {
  return async (dispatch) => {
    let { data: projects, error } = await supabase.from("projects").select("*");
    dispatch(setProjects(projects));
  };
};

const initState = [];

export default (state = initState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return action.projects;
    default:
      return state;
  }
};
