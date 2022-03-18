import axios from 'axios';

const SET_USER = 'SET_USER';

const setUser = (user) => ({ type: SET_USER, user });

export default function (state = {}, action) {
  switch (action.type) {
    case SET_USER: {
      return action.user;
    }
    default:
      return state;
  }
}
