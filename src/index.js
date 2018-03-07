import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import Root from './components/Root'
import theApp from './reducers'
import registerServiceWorker from './registerServiceWorker';

import './assets/index.css'

let store = createStore(theApp)
 
render(
  <Root store={store} />,
  document.getElementById('root')
)



registerServiceWorker();


