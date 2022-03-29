import supabase from "../client";
const SET_MESSAGES = "SET_MESSAGES";
const ADD_MESSAGE = "ADD_MESSAGE";

export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    messages,
  };
};

export const _addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    message,
  };
};

export const fetchMessages = (convoId) => {
  return async (dispatch) => {
    let { data: messages, error } = await supabase
      .from("messages")
      .select(`
        *,
        user (
          id, imageUrl
        )
        `)
        .eq("conversation_id", `${convoId}`)
    if (error) {
      console.log(error);
    } else {
      dispatch(setMessages(messages));
    }
  };
};

export const addMessage = (message) => {
  return async (dispatch) => {
    dispatch(_addMessage(message));
  }
}


export default (state = [], action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return action.messages;
      case ADD_MESSAGE:
        return [...state, action.message];
    default:
      return state;
  }
};
