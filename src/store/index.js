import { createStore, combineReducers, applyMiddleware } from "redux";
import user from "./user";
import projects from "./projects";

const reducer = combineReducers({
  user,
  projects,
});

const store = createStore(reducer);

export default store;
