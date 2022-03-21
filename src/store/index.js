import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import user from "./user";
import projects from "./projects";
import project from "./project";

// o: have you considered not using a store at all?
//  how many state variables do you need to access across multiple components?

const reducer = combineReducers({
  user,
  projects,
  project,
});

const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;
