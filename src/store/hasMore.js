import { END_PROJECTS, SET_PROJECTS } from './projects';

const initState = true;

export default (state = initState, action) => {
  switch (action.type) {
    case END_PROJECTS:
      return false;
    case SET_PROJECTS:
      return true;
    default:
      return state;
  }
};
