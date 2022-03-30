const SET_SINGLE_DM = "SET_SINGLE_DM";

export const setSingleDM = (userId) => {
  return {
    type: SET_SINGLE_DM,
    userId,
  };
};

export const fetchSingleDM = (userId) => {
     return (dispatch) => dispatch(setSingleDM(userId));
    }

export default (state = [], action) => {
  switch (action.type) {
    case SET_SINGLE_DM:
      return action.userId;
    default:
      return state;
  }
};
