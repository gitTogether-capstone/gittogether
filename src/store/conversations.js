import supabase from "../client";
const SET_CONVERSATION = "SET_CONVERSATION";

export const setConversations = (conversations) => {
  return {
    type: SET_CONVERSATIONS,
    conversations,
  };
};

export const fetchConversations = (userId) => {
  return async (dispatch) => {
    let { data: conversations, error } = await supabase
      .from("conversation")
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
