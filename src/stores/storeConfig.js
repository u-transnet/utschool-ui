// @flow

import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function schoolStore(initialState: any) {
  const store = createStore(rootReducer, initialState);
  return store;
}
