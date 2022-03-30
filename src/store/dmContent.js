import supabase from "../client";

const SET_DM = "SET_DM";
const ADD_DM = "ADD_DM"

export const setDirectMessages = (directMessages) => {
  return {
    type: SET_DM,
    directMessages,
  };
};

export const _addDM = (directMessage) => {
  return {
    type: ADD_DM,
    directMessage,
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

export const addDM = (directMessage) => {
  return async (dispatch) => {
    dispatch(_addDM(directMessage));
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case SET_DM:
      return action.directMessages;
      case ADD_DM:
        return [...state, action.directMessage];
    default:
      return state;
  }
};
