// @flow
import { reducer as reduxFormReducer } from 'redux-form';
import { combineReducers } from 'redux';

import app from './app';
import user from './user';
import lectures from './lectures';

const theReducers = combineReducers({
  app,
  user,
  lectures,
  form: reduxFormReducer
});

export default theReducers;
