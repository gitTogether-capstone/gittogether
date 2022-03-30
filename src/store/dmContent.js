import supabase from "../client";

const SET_DM = "SET_DM";
export const setDirectMessages = (directMessages) => {
  return {
    type: SET_DM,
    directMessages,
  };
};

export const fetchDMContent = (currentUserId) => {
  return async (dispatch) => {
    const { data: directMessages, error } = await supabase
      .from("directMessages")
      .select("*")
      .or(`receiver_Id.eq.${currentUserId}, sender_Id.eq.${currentUserId}`);
    if (error) {
      console.log(error);
    } else {
      dispatch(setDirectMessages(directMessages));
    }
  };
};

// export const fetchDMContent = (currentUserId) => {
//   return async (dispatch) => {
//     const { data: directMessages, error } = await supabase
//       .from("directMessages")
//       .select(
//         `
//       *,
//       sender:user!directMessages_sender_Id_fkey(id,username,imageUrl),
//       receiver:user!directMessages_receiver_Id_fkey(id,username,imageUrl)
//       `
//       )
//       .in("sender_Id", [currentUserId])
//       .in("receiver_Id", [currentUserId]);
//     if (error) {
//       console.log(error);
//     } else {
//       dispatch(setDirectMessages(directMessages));
//     }
//   };
// };

export default (state = [], action) => {
  switch (action.type) {
    case SET_DM:
      return action.directMessages;
    default:
      return state;
  }
};
