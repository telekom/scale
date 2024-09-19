# Scale und React

React unterstützt Web Components. Bestehende Einschränkungen und wie du sie umgehen kannst, listen wir im Folgenden auf.

Ein Beispiel für eine Boilerplate App findest du im Ordner _Examples_ in unserem [GitHub Repository](https://github.com/telekom/scale/tree/main/examples).

## Setup

Installiere zuerst das Package:

```bash
npm install @telekom/scale-components@next
```

Lade danach die Komponenten und das CSS in `index.js`:

```js
import { defineCustomElements } from '@telekom/scale-components/loader';
import '@telekom/scale-components/dist/scale-components/scale-components.css';

// ...

defineCustomElements();
```

Jetzt kannst du die Scale-Komponenten ohne zusätzlichen Import nutzen:

```jsx
import React from 'react';

const App = () => (
  <div>
    <scale-button>Click</scale-button>
  </div>
);

export default App;
```

Wenn du unser automatisch generiertes Proxy Package `@telekom/scale-components-react` nutzt (vergiss nicht, es zu installieren `npm install @telekom/scale-components-react@next`):

```jsx
import React from 'react';
import { ScaleButton } from '@telekom/scale-components-react';

const App = () => (
  <div>
    <ScaleButton>Click</ScaleButton>
  </div>
);

export default App;
```

> Das erste Beispiel nutzt die Web Component `<scale-button>` direkt, das zweite ruft sie innerhalb der React-Komponente `ScaleButton` auf. Die zweite Variante ist besonders nützlich, um Einschränkungen des Frameworks zu umgehen.

## Einschränkungen

### Data Binding

React übermittelt Daten zu Custom Elements nicht als Properties, sondern als HTML-Attribute, die nur aus Strings bestehen dürfen. Objekte und Arrays werden in Strings konvertiert. Das produziert `some-attr="[object Object]"`. Weitere Informationen findest du in diesem [GitHub Issue](https://github.com/facebook/react/issues/11347).

### Custom Events

React hat sein eigenes [Synthetic Event System](https://reactjs.org/docs/handling-events.html), weshalb Custom Events nicht deklarativ angebunden werden können. `<scale-button on-scale-change={handleChange}>` wird nicht funktionieren.

Diese Einschränkung ohne Hilfe zu umgehen, kann aufwändig sein und erfordert imperativen Code. Wir empfehlen die Verwendung eines Wrappers oder Interop Layers.

- [reactify-wc](https://github.com/BBKolton/reactify-wc) — Konvertiere Web Components in React Components
- [@skatejs/val](https://github.com/skatejs/val) — Generischer Wrapper für bessere VDOM/DOM-Integration
- [@telekom/scale-components-react](https://www.npmjs.com/package/@telekom/scale-components-react) — Unser automatisch generiertes Proxy Package

Ein Beispiel mit `reactify-wc` sieht wie folgt aus:

```jsx
import React from 'react';
import reactifyWc from 'reactify-wc';

const ScaleSlider = reactifyWc('scale-slider');

const App = () => {
  const handleInput = (event) => {
    // it works!
  };
  return (
    <ScaleSlider label="Example" on-scale-input={handleInput}></ScaleSlider>
  );
};

export default App;
```

Bitte beachten Sie, dass es wichtig ist, das Wort "on" vor dem Ereignisnamen zu verwenden, wenn Sie benutzerdefinierte Ereignisse von einer Skala in einem Wrapper verwenden. "scale-change" sollte zum Beispiel als "on-scale-change" geschrieben werden.

## Events in React

Um Konflikte mit Standard-Events zu vermeiden und für bessere Kompatibilität mit anderen Libraries und Frameworks, sind Custom Events mit dem Prefix `scale` gekennzeichnet. Event-Namen werden in kebab-case-Syntax geschrieben (z.B. `scale-change`). Beachte, dass die Events vor v3 im сamelCase geschrieben wurden (z.B. `scaleChange`). Diese sind jetzt veraltet, aber noch verfügbar, um die Abwärtskompatibilität zu gewährleisten. Für die neuesten Komponenten gelten nur noch Events im kebab-case. Die Dokumentation zu Custom Events findest du auf den entsprechenden Komponentenseiten im Abschnitt "Docs".

Aufgrund von Reacts [Synthetic Events](https://reactjs.org/docs/handling-events.html), bedarf das Binding von Custom Events etwas Mehraufwand. Nutze wie oben beschrieben einen Interop Layer oder alternativ [`ref`](https://reactjs.org/docs/refs-and-the-dom.html), um `addEventListener` imperativ anzuwenden.

## Styles

Die meisten Scale-Komponenten nutzen das Shadow-DOM. So kannst du Styles direkt von ausserhalb der Komponente anwenden. Unter [Anpassungen und Themes](./?path=/docs/guidelines-customization-and-themes--page) findest du mehr Informationen.

Die `styled-components`-Techniken werden nicht funktionieren. Es ist möglich, Overwrites für Scoped Variables inline anzuwenden:

```jsx
// ..

const Slider = (
  <ScaleSlider
    label="Example"
    track-small
    style={{
      '--background-track': 'tomato',
      '--color-display-value': 'limegreen',
    }}
  ></ScaleSlider>
);
```

## Proxy Package

Die automatisch generierten Proxy Packages könnten in v4 auslaufen:

- `@telekom/scale-components-react`
- `@telekom/scale-components-react-neutral`

React bietet nun Support für Custom Elements in der `@experimental` Distribution. Probiere es aus! Wir freuen uns auf jegliches Feedback. Siehe https://github.com/facebook/react/issues/11347#issuecomment-988970952
