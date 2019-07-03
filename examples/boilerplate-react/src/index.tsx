import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { defineCustomElements, JSX as LocalJSX } from '@telements/components/loader';
import { HTMLAttributes } from 'react';

type StencilToReact<T> = {
  [P in keyof T]?: T[P] & Omit<HTMLAttributes<Element>, 'className'> & {
    class?: string;
  };
} ;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace JSX {
    interface IntrinsicElements extends StencilToReact<LocalJSX.IntrinsicElements> {
    }
  }
}

defineCustomElements(window)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
