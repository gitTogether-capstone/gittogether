import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import user from './user';
import projects from './projects';
import project from './project';
import comments from './comments';
import hasMore from './hasMore';
import messages from './messages';
import conversations from './conversations';
import convoId from './convoId';

const reducer = combineReducers({
  user,
  projects,
  project,
  comments,
  hasMore,
  messages,
  conversations,
  convoId,
});

const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;
