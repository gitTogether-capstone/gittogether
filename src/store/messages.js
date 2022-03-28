import supabase from "../client";
const SET_MESSAGES = "SET_MESSAGES";

export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    messages,
  };
};

export const fetchMessages = (convoId) => {
  return async (dispatch) => {
    let { data: messages, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", `${convoId}`);

    if (error) {
      console.log(error);
    } else {
      dispatch(setMessages(messages));
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return action.messages;
    default:
      return state;
  }
};
