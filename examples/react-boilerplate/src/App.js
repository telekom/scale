import './App.css';
import { ScaleButton } from '@telekom/scale-components-react-neutral';

function App() {
  return (
    <main>
      <div className="hello">
        <h1 className="scl-font-variant-heading-1">Scale + React</h1>
        <ScaleButton
          href={'https://telekom.github.io/scale/?path=/story/scale-for-developers-scale-and-angular--page'}
          title={'External link'}
        >
          Open the docs
        </ScaleButton>
      </div>
    </main>
  );
}

export default App;
