// @flow

import { compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import rootReducer from '../reducers';

export default function schoolStore(initialState: any) {
  const enhancer = compose(
    /* [middlewares] */
    persistState(/*paths, config*/)
  );
  const store = createStore(rootReducer, initialState, enhancer);
  return store;
}
