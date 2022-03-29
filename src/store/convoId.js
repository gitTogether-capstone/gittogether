const SET_SINGLE_CONVO = "SET_SINGLE_CONVO";

export const setSingleConvo = (convoId) => {
  return {
    type: SET_SINGLE_CONVO,
    convoId,
  };
};

export const fetchSingleConvo = (convoId) => {
    console.log('This is convoId: ', convoId)
     return (dispatch) => dispatch(setSingleConvo(convoId));
    }

export default (state = [], action) => {
  switch (action.type) {
    case SET_SINGLE_CONVO:
      return action.convoId;
    default:
      return state;
  }
};
