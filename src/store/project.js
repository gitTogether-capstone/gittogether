import supabase from "../client";
const GET_PROJECT = "GET_PROJECT";
const ADD_PROJECT = "ADD_PROJECT";

export const getProject = (project) => {
  return {
    type: GET_PROJECT,
    project,
  };
};

export const addProject = (newProject) => {
  return {
    type: ADD_PROJECT,
    newProject,
  };
};

export const fetchProject = (id) => {
  return async (dispatch) => {
    let { data: project, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();
    console.log("project", project);
    console.log("error", error);
    dispatch(getProject(project));
  };
};
export const addProjectThunk = (newProject) => {
  return async (dispatch) => {
    let { data, error } = await supabase
      .from("projects")
      .insert([
        {
          name: "",
          description: "",
          beginnerFriendly: "",
          repoLink: "",
          owner: "",
        },
      ]);
  };
};
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT:
      return action.project;
    case ADD_PROJECT:
      return action.newProject;
    default:
      return state;
  }
};
