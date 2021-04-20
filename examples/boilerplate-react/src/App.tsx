import React from "react";
import {
  ScaleButton,
  ScaleCard,
  ScaleLink,
  ScaleTag,
} from "@telekom/scale-components-react-neutral";

import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <h1>React App</h1>
      <h3>Alert</h3>
      <ScaleLink href="http://example.com" target="_blank" variant="success">
        Success
      </ScaleLink>
      <h3>Button</h3>
      <ScaleButton variant="primary">Click!</ScaleButton>
      <h3>Card</h3>
      <ScaleCard>A title</ScaleCard>
      <h3>Tag</h3>
      <ScaleTag
        dismissable
        size="small"
        onScaleClose={(event: any) => console.log(event)}
      >
        A title
      </ScaleTag>
      <div className="block">One</div>
      <div className="block">One</div>
      <div className="block">One</div>
      <div className="block">One</div>
      <div className="block">One</div>
      <div className="block">One</div>
    </div>
  );
};

export default App;
