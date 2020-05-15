import * as React from "react";
import {
  ScaleButton,
  ScaleCard,
  ScaleLink,
  ScaleTag,
  ScaleModal,
} from "@scaleds/components-react";
import "./App.css";
import { ANIMATIONS } from '@proyecto26/animatable-component';


const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);

  return (
    <div className="App">
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

      <h3>Modal</h3>
      <ScaleButton onClick={() => setModalOpen(true)}>Open modal</ScaleButton>

      <ScaleModal opened={isModalOpen} onScaleClose={() => setModalOpen(false)} transitions={{
          modalContent: {
              IN: {
                  duration: 200,
                  transition: ANIMATIONS.BOUNCE_IN_TOP,
              },
              OUT: {
                  transition: ANIMATIONS.BOUNCE_OUT,
                  duration: 200,
              },
          },
          backDrop: {
              IN: {
                  duration: 200,
                  transition: ANIMATIONS.FADE_IN,
              },
              OUT: {
                  transition: ANIMATIONS.FADE_OUT,
                  duration: 200,
              },
          },
      }}>
        <span slot="header">Header</span> content of the modal with header and
        buttons
        <span slot="close">Close</span>
        <span slot="modal-actions">
          <ScaleButton onClick={() => setModalOpen(false)}>cancel</ScaleButton>
          <ScaleButton onClick={() => setModalOpen(false)}>submit</ScaleButton>
        </span>
      </ScaleModal>
    </div>
  );
};

export default App;
