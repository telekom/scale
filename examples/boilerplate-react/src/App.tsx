import React from 'react';
import './App.css';
import '@telements/components-web/dist/components-web';
import { Button, Alert, Card } from '@telements/components-react';

const App: React.FC = () => {
  const onWebComponentButtonClick = () => {
    console.log('onWebComponentButtonClick')
  };

  return (
    <div className="App">
      <h1>React App</h1>
      <h3>Alert</h3>
      <Alert context="success">Success</Alert>
      <h3>Button</h3>
      <Button>Click!</Button>
      <h3>Card</h3>
      <Card>A tile</Card>
      <hr />
      <h1>Web components in React</h1>
      <h3>Alert</h3>
      <t-alert context="success">Success</t-alert>
      <h3>Button</h3>
      <t-button onClick={onWebComponentButtonClick}>Hello</t-button>
      <h3>Card</h3>
      <t-card>A title</t-card>
    </div>
  );
}

export default App;
