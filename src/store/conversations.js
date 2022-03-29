import supabase from "../client";
const SET_CONVERSATIONS = "SET_CONVERSATIONS";
const SET_SINGLE_CONVO = "SET_SINGLE_CONVO";

export const setConversations = (conversations) => {
  return {
    type: SET_CONVERSATIONS,
    conversations,
  };
};

export const setSingleConvo = (convoId) => {
  return {
    type: SET_SINGLE_CONVO,
    convoId,
  };
};

export const fetchConversations = (userId) => {
  return async (dispatch) => {
    let { data: conversations, error } = await supabase
    .from("conversation_member")
    .select(`
        *,
        conversation (
          *
        )
        `)
        .eq("user_id", `${userId}`)
    if (error) {
      console.log(error);
    } else {
      dispatch(setConversations(conversations));
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_CONVERSATIONS:
      return action.conversations;
    default:
      return state;
  }
};
