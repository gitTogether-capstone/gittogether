import supabase from "../client";
const SET_DM = "SET_DM";

export const setDirectMessages = (directMessages) => {
  return {
    type: SET_DM,
    directMessages,
  };
};

export const fetchDirectMessages = (currentUserId) => {
  return async (dispatch) => {
    let { data: directMessages, error } = await supabase
      .from("directMessages")
      .select(
        `
            *,
            sender: user!directMessages_sender_Id_fkey(id, username, imageUrl),
            receiver: user!directMessages_receiver_Id_fkey(id, username, imageUrl)
       `
      )
      .or(`receiver_Id.eq.${currentUserId}, sender_Id.eq.${currentUserId}`);
    if (error) {
      console.log(error);
    } else {
      console.log("This is directMessages: ", directMessages);
      dispatch(setDirectMessages(directMessages));
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_DM:
      return action.directMessages;
    default:
      return state;
  }
};
