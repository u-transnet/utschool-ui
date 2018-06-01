// @flow

import * as React from 'react';
import { render } from 'react-dom';
import schoolStore from './stores/storeConfig';

import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';

import './assets/index.css';

const store = schoolStore();
const root = document.getElementById('root');

root ? render(<Root store={store} />, root) : null;

registerServiceWorker();
