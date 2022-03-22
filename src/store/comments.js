import supabase from "../client";

const GET_COMMENTS = "GET_COMMENTS";

export const getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments,
  };
};

// supabase.from("comments")
// .select("*")
// .eq("projectId", idOfCurrentProject)

// export const fetchProject = (id) => {
//   return async (dispatch) => {
//     let { data: project, error } = await supabase
//       .from("projects")
//       .select("*")
//       .eq("id", id)
//       .single();
//     console.log("project", project);
//     console.log("error", error);
//     dispatch(getProject(project));
//   };
// };

export const fetchComments = (projectId) => {
  return async (dispatch) => {
    let { data: comments, error } = await supabase
      .from("comments")
      .select("*")
      .eq("projectId", projectId);
    console.log("projectId", projectId);
    console.log("comments", comments);
    // getComments(data);
    dispatch(getComments(comments));
  };
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return action.comments;
    default:
      return state;
  }
};
