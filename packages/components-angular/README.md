# Scale and Angular

`Angular` works well with custom elements, but has some minor limitations.

To work around these problems we provide custom element wrappers for better developer experience.

Please note that you will need to install both, the `@telekom/scale-components` as well as the `@telekom/scale-components-angular` packages.

Once you have installed both packages and defined the custom elements, `Scale` components behave mostly the way you would expect a `Angular` component to behave!

## main.ts

```javascript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { applyPolyfills, defineCustomElements } from '@telekom/scale-components/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

applyPolyfills().then(() => {
  defineCustomElements(window);
});
```

## src/app.module.ts

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ComponentLibraryModule } from '@telekom/scale-components-angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ComponentLibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

```

## src/app.component.html
```html
<div>
    <scale-button>Click!</scale-button>
</div>
```

## Events in Angular

In order to prevent collisions with standard events and compatibility with other libraries and frameworks,
some components of `Scale` are using custom event names. You can find documentation for the custom events on the respective component pages in the `docs` section.

Events in Angular are prefixed with: `scale-{event-name}`

---
Find [Telekom Scale on GitHub](https://github.com/telekom/scale).
