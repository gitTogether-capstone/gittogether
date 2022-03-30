import supabase from "../client";
// import { fetchUserDMs } from "../util";

const SET_DM_USERS = "SET_DM_USERS";

export const setDMUsers = (dmUsers) => {
  return {
    type: SET_DM_USERS,
    dmUsers,
  };
};

// export const fetchDirectMessages = (currentUserId) => {
//   return (dispatch) => {
//    let directMessages = fetchUserDMs(currentUserId);
//    dispatch(setDirectMessages(directMessages));
//   };
// };

export const fetchDMUsers = (currentUserId) => {
  return async (dispatch) => {
    const { data } = await supabase
      .from("directMessages")
      .select(
        `*,
  sender: user!directMessages_sender_Id_fkey(id, username, imageUrl),
  receiver: user!directMessages_receiver_Id_fkey(id, username, imageUrl)
  `
      )
      .or(`receiver_Id.eq.${currentUserId}, sender_Id.eq.${currentUserId}`);

    let seen = {};
    let users = [];

    for (const element of data) {
      if (element.receiver.id !== currentUserId && !seen[element.receiver.id]) {
        users.push(element.receiver);
        seen[element.receiver.id] = true;
      }
      if (element.sender.id !== currentUserId && !seen[element.sender.id]) {
        users.push(element.sender);
        seen[element.sender.id] = true;
      }
    }
    dispatch(setDMUsers(users));
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_DM_USERS:
      return action.dmUsers;
    default:
      return state;
  }
};
