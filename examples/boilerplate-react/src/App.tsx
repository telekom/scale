import React from 'react';
import './App.css';

const App: React.FC = () => (
  <div className="App">
    <h1>React App</h1>
    <h3>Alert</h3>
    <scale-link variant="success">Success</scale-link>
    <h3>Button</h3>
    <scale-button variant="primary">Click!</scale-button>
    <h3>Card</h3>
    <scale-card>A title</scale-card>
  </div>
);

export default App;
