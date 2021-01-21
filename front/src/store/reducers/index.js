/* eslint-disable object-shorthand */
import { combineReducers } from 'redux';

import user from './user';
import project from './project';

export default combineReducers({
  user,
  project,
});
