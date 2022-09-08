# Scale und Vue

Vue unterstützt problemlos Web Components.

Ein Beispiel für eine Boilerplate-App findest du im [GitHub Repository](https://github.com/telekom/scale/tree/main/examples).

## Setup

Installiere zuerst das Package:

```bash
npm install @telekom/scale-components@next
```

Lade danach die Komponenten-Bibliothek und das CSS in `main.js`:

```ts
import { defineCustomElements } from '@telekom/scale-components/loader';
import '@telekom/scale-components/dist/scale-components/scale-components.css';

// ...

defineCustomElements();
```

Um Vue den Umgang mit Custom Elements zu erleichtern, [ist etwas Konfiguration nötig](https://v3.vuejs.org/guide/migration/custom-elements-interop.html#autonomous-custom-elements).

Für **Vue v2**:

```js
// main.js
Vue.config.ignoredElements = [/scale-\w*/];
```

Für **Vue v3**, setze `compilerOptions.isCustomElement`:

```js
// in vue.config.js (vue-cli)
chainWebpack: (config) => {
  config.module
    .rule('vue')
    .use('vue-loader')
    .tap((options) => {
      // https://v3.vuejs.org/guide/migration/custom-elements-interop.html#autonomous-custom-elements
      options.compilerOptions = {
        isCustomElement: (tag) => tag.startsWith('scale-'),
      };
      return options;
    });
};

// in webpack config
rules: [
  {
    test: /\.vue$/,
    use: 'vue-loader',
    options: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('scale-'),
      },
    },
  },
  // ...
];

// in vite.config.js
defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('scale-'),
        },
      },
    }),
  ],
});

// or in main.js (on-the-fly template compilation)
const app = Vue.createApp({});
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('scale-');
```

Falls in dem Projekt ESLint mit `eslint-plugin-vue` verwendet wird, sollte zusätzlich die Regel `vue/no-deprecated-slot-attribute` deaktiviert werden.

```js
// In .eslintrc.js or in package.json
rules: {
  "vue/no-deprecated-slot-attribute": "off",
},
```

Nun solltest du in der Lage sein, Scale-Komponenten in deinen Templates zu verwenden:

```html
<div>
  <scale-button>Click!</scale-button>
</div>
```

## Events in Vue

Um Konflikte mit Standard-Events zu vermeiden und für beste Kompatibilität mit anderen Libraries und Frameworks, sind die Custom Events, die von einigen Scale-Komponenten ausgegeben werden, mit dem Prefix `scale` gekennzeichnet. Event-Namen werden in camelCase-Syntax geschrieben (z. B. scaleChange). Die Dokumentation zu Custom Events findest du auf den jeweiligen Komponentenseiten im Abschnitt "Docs".

An Events mit dem Prefix `scale` kannst du reguläre Vue-Syntax anbinden:

```html
<scale-slider @scaleInput="handleInput"></scale-slider>
```

## Form Input Bindings

Die `v-model`-Directive wird mit Custom Elements nicht funktionieren; es funktionieren nur native Formularsteuerelemente wie `input` und `textarea`.

Du kannst ganz einfach die gleichen Ergebnisse erzielen:

```html
<scale-text-field
  :value="example"
  @scaleChange="example = $event.target.value"
></scale-text-field>
```

## Proxy Package

Die automatisch generierten Proxy Packages werden in v4 entfernt:

- `@telekom/scale-components-vue`
- `@telekom/scale-components-vue-neutral`

Bitte nutze `@telekom/scale-components` direkt. Custom Elements werden bereits super unterstützt.
