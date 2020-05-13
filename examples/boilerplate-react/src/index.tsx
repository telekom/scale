import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { defineCustomElements } from '@scaleds/components/loader';
import App from './App';
import './index.css';

import { useTheme } from '@scaleds/components/dist/theme';

useTheme({
  shape: {
    borderRadius: 24
  }
})

defineCustomElements(window)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
