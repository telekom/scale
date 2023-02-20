import React from 'react';
import { defineCustomElements } from "@telekom/scale-components-neutral/loader";
import { createRoot } from 'react-dom/client';
import './index.css';
import "@telekom/scale-components-neutral/dist/scale-components/scale-components.css";

import App from './App';
import reportWebVitals from './reportWebVitals';

defineCustomElements(window);

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
