// @flow

import { combineReducers } from 'redux';
import app from './app';
import student from './student';

const theIndex = combineReducers({
  app,
  student
});
export default theIndex;
