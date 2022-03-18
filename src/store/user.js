import axios from "axios";
import supabase from "../client";

const SET_USER = "SET_USER";

export const setUser = (user) => ({ type: SET_USER, user });
export const login = () => {
  return async (dispatch) => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "github",
    });
    dispatch(setUser(user));
  };
};

export const signOut = () => {
  return async (dispatch) => {
    const { user, session, error } = await supabase.auth.signOut();
    dispatch(setUser({}));
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case SET_USER: {
      return action.user;
    }
    default:
      return state;
  }
}
