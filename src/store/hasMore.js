import { END_PROJECTS } from './projects';

const initState = true;

export default (state = initState, action) => {
  switch (action.type) {
    case END_PROJECTS:
      return false;
    default:
      return state;
  }
};
