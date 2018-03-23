// @flow

import { combineReducers } from 'redux';

import app from './app';
import student from './student';
import user from './user';

const theReducers = combineReducers({
  app,
  student,
  user
});

export default theReducers;
