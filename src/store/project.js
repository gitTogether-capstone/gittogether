import supabase from "../client";
const GET_PROJECT = "GET_PROJECT";

export const getProject = (project) => {
  return {
    type: GET_PROJECT,
    project,
  };
};

export const fetchProject = (id) => {
  return async (dispatch) => {
    let { data: project, error } = await supabase
      .from("projects")
      .select()
      .eq("id", id)
      .single();
    console.log("project", project);
    dispatch(getProject(project));
  };
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT:
      return action.project;
    default:
      return state;
  }
};
