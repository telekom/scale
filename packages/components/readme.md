# Scale Components

## Local development

```bash
# get dependencies
yarn

# build assets
yarn build

# start development mode
yarn start
```

## Theming

Scale uses `css-in-js` and particular [`jss`](http://jss.com) as it's styling solution. 

### Default theme
The default theme can be found under `src/theme/defaultTheme.ts`

### Using the theme in a HTML file

```html
<html>
    ...
    <!-- Include theme helper  -->
    <script src="/build/theme/theme.iife.js"></script>

    <!-- Include components  -->
    <script type="module" src="/build/scale-components.esm.js"></script>
    <script nomodule src="/build/scale-components.js"></script>
    <script>
      // Applying changes to theme
      scale.useTheme({
        shape: {
          borderRadius: 24
        },
        components: {
          Button: {
            button: {
              background: 'purple',
            }
          }
        }
      })
    </script>
    <body>
      <h3 id="title">Button</h3>
      <scale-button>Click!</scale-button>
    </body>
    <script>
      // Getting current theme values
      const { colors } = scale.getTheme()
      
      document.getElementById('title').style.color = colors.primary.default
    </script>
</html>
```

### Using the theme in a React app

Modifying existing theme, preferrably in `index.(jsx|tsx)`

```tsx
const { useTheme } = require('@scaleds/components/dist/theme')

useTheme({
  shape: {
    borderRadius: 24
  },
  components: {
    Button: {
      button: {
        background: 'purple',
      }
    }
  }
})
```

Using current theme values 

```tsx
import React from 'react';
import { Button } from '@scaleds/react-wrapper';

const { colors } = require('@scaleds/components/dist/theme').getTheme()

const App: React.FC = () => (
  <div className="app">
    <h3 style={{ color: colors.primary.default }}>
      Button
    </h3>
    <Button variant="primary">Click!</Button>
  </div>
);
```

### Using the theme in a Angular app

Modifying existing theme, preferrably in `main.ts`

```tsx
const { useTheme } = require('@scaleds/components/dist/theme')

useTheme({
  shape: {
    borderRadius: 24
  },
  components: {
    Button: {
      button: {
        background: 'purple',
      }
    }
  }
})
```

Using current theme values 

`app.component.ts`

```ts
import { Component } from '@angular/core';
const { colors } = require('@scaleds/components/dist/theme').getTheme()

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'boilerplate-angular';
  colors = colors
}

```

`app.component.html`

```html
<div>
    <h3 style="color: {{colors.primary.default}}">Button</h3>
    <scale-button>Click!</scale-button>
</div>
```

### Using the theme in a Vue app

Modifying existing theme, preferrably in `main.ts`

```tsx
const { useTheme } = require('@scaleds/components/dist/theme.esm.js')

useTheme({
  shape: {
    borderRadius: 24
  },
  components: {
    Button: {
      button: {
        background: 'purple',
      }
    }
  }
})
```

Using current theme values 

`App.vue`

```ts
<template>
  <div>
    <h3 v-bind:style="`color: ${colors.primary.default}`">
      Button
    </h3>
    <scale-button>Click!</scale-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
const { colors } = require('@scaleds/components/dist/theme.esm.js').getTheme()

export default Vue.extend({
  name: "app",
  data: () => ({
    colors
  })
});
</script>

```