import supabase from '../client';
const SET_PROJECTS = 'SET_PROJECTS';
const ADD_PROJECTS = 'ADD_PROJECTS';
export const END_PROJECTS = 'END_PROJECTS';

export const setProjects = (projects) => ({ type: SET_PROJECTS, projects });
const addProjects = (projects) => ({ type: ADD_PROJECTS, projects });
const endProjects = () => ({ type: END_PROJECTS });

export const fetchProjects = (filters, categories, languages, page, type) => {
  return async (dispatch) => {
    // const category = filters.category =
    categories = categories.map((category) => category.id);
    languages = languages.map((language) => language.id);
    const startingRange = 20 * page;
    console.log(categories);
    let { data: projects, error } = await supabase
      .from('projects')
      .select(
        `
    *,
    languages (id, name),
    categories (id, name),
    projectUser(*, user(id, username, imageUrl))
    `
      )
      .eq('projectUser.isOwner', true)
      .in(
        'categoryId',
        filters.category === 'all' ? categories : [filters.category]
      )
      .in(
        'languageId',
        filters.languages.length ? filters.languages : languages
      )
      .in('beginnerFriendly', filters.beginnerFriendly ? [true] : [true, false])
      .range(startingRange, startingRange + 19);

    if (error) {
      console.log(error);
    }
    if (projects.length === 0) {
      dispatch(endProjects());
    } else {
      if (type === 'initial') {
        dispatch(setProjects(projects));
      } else if (type === 'more') {
        dispatch(addProjects(projects));
      }
    }
  };
};

const initState = [];

export default (state = initState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return action.projects;
    case ADD_PROJECTS:
      return [...state, ...action.projects];
    default:
      return state;
  }
};
