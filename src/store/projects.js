import supabase from "../client";
const SET_PROJECTS = "SET_PROJECTS";

export const setProjects = (projects) => ({ type: SET_PROJECTS, projects });

export const fetchProjects = (filters, categories, languages) => {
  return async (dispatch) => {
    // const category = filters.category =
    categories = categories.map((category) => category.id);
    languages = languages.map((language) => language.id);
    console.log(categories);
    let { data: projects, error } = await supabase
      .from("projects")
      .select(
        `
    *,
    languages (id, name),
    categories (id, name),
    projectUser(*, user(id, username, imageUrl))
    `
      )
      .eq("projectUser.isOwner", true)
      .in(
        "categoryId",
        filters.category === "all" ? categories : [filters.category]
      )
      .in(
        "languageId",
        filters.languages.length ? filters.languages : languages
      )
      .eq("beginnerFriendly", filters.beginnerFriendly);

    console.log("new project fetch", projects);
    if (error) {
      console.log(error);
    }
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
