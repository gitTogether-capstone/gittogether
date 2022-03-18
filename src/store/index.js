import { createStore, combineReducers, applyMiddleware } from 'redux';
import user from './user';

const reducer = combineReducers({
  user,
});

const store = createStore(reducer);

export default store;
