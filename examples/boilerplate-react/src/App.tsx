import React from 'react';
import { Button, Card, Link, Tag } from '@scaleds/react-wrapper';
import './App.css';

const App: React.FC = () => (
  <div className="App">
    <h1>React App</h1>
    <h3>Alert</h3>
      <Link href="http://example.com" target="_blank" variant="success">Success</Link>
    <h3>Button</h3>
      <Button variant="primary">Click!</Button>
    <h3>Card</h3>
      <Card>A title</Card>
    <h3>Tag</h3>
      <Tag dismissable size="small" onClose={(event: any) => console.log(event)}>A title</Tag>
  </div>
);

export default App;
