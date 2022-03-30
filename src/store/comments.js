import supabase from '../client';

const GET_COMMENTS = 'GET_COMMENTS';

export const getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments,
  };
};

export const fetchComments = (projectId) => {
  return async (dispatch) => {
    let { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('projectId', projectId);
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
