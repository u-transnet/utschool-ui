// @flow

import * as React from 'react';
import { render } from 'react-dom';
import schoolStore from './stores/storeConfig';
//import thunkMiddleware from 'redux-thunk'

import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';

import './assets/index.css';

const store = schoolStore();

render(<Root store={store} />, document.getElementById('root'));

registerServiceWorker();
