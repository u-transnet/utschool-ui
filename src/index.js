import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import Root from './components/Root';
import theReducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

import './assets/index.css';

let store = createStore(theReducers, window.STATE_FROM_SERVER);

render(<Root store={store} />, document.getElementById('root'));

registerServiceWorker();
