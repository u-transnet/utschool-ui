import * as React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import Root from './components/Root';
import theReducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

import './assets/index.css';

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
});

//let store = createStore(theReducers, window.STATE_FROM_SERVER);
let store = (theReducers,
window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

render(<Root store={store} />, document.getElementById('root'));

registerServiceWorker();
