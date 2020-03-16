import React from 'react';
import './App.css';

const App: React.FC = () => (
  <div className="App">
    <h1>React App</h1>
    <h3>Alert</h3>
    <t-alert variant="success">Success</t-alert>
    <h3>Button</h3>
    <t-button variant="primary">Click!</t-button>
    <h3>Card</h3>
    <t-card>A title</t-card>
  </div>
);

export default App;
