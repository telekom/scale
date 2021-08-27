import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { defineCustomElements } from '@telekom/scale-components-neutral/loader';
import '@telekom/scale-components-neutral/dist/scale-components/scale-components.css';
import App from './App';
import './index.css';


defineCustomElements(window)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
