// @flow
import { reducer as reduxFormReducer } from 'redux-form';
import { combineReducers } from 'redux';

import app from './app';
import user from './user';
import login from './login';
import lectures from './lectures';

const theReducers = combineReducers({
  app,
  user,
  login,
  lectures,
  form: reduxFormReducer
});

export default theReducers;
