# Scale and Angular

Angular fully supports web components.

You can find an example boilerplate app in the "examples" folder in the [GitHub repo](https://github.com/telekom/scale/tree/main/examples/angular-boilerplate).

## Setup

First, install the package:

```bash
npm install @telekom/scale-components@next
```

Then load the component library in `main.ts`:

```ts
// src/main.ts
import { defineCustomElements } from '@telekom/scale-components/loader';

// ...

defineCustomElements();
```

After that, load the CSS in the `angular.json` config file:

```json
// angular.json
{
  "build": {
    "styles": [
      "node_modules/@telekom/scale-components/dist/scale-components/scale-components.css"
    ]
  }
}
```

In order for Angular to handle non-Angular element names, include the [`CUSTOM_ELEMENTS_SCHEMA`](https://angular.io/api/core/CUSTOM_ELEMENTS_SCHEMA) in `src/app/app.module.ts`:

```ts
// src/app/app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  // ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

If you use routing, also include it in `src/app/app-routing.module.ts`:

```ts
// src/app/app-routing.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  // ..
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule {}
```

You should now be able to use Scale components in your templates:

```html
<div>
  <scale-button>Click!</scale-button>
</div>
```

## Events in Angular

In order to prevent collisions with standard events and for better compatibility with other libraries and frameworks, the custom events emitted by some Scale components are prefixed with `scale`. Event names are kebab-cased (e.g. scale-change). Note, that before v3 events were camelCased (e.g. `scaleChange`), these are now deprecated, and are not available in latest version of Scale also for newest components only kebab-case events apply. You can find the documentation to custom events on the respective component pages in the "docs" section.

You can bind to `scale`-prefixed events with the regular Angular syntax:

```html
<scale-slider (scale-input)="setValue($event)"></scale-slider>
```

## Reactive Forms

If you're working with Reactive Forms, you will notice that the form controls in Scale —text field, checkbox, etc.— do not work out of the box. Only native form control elements like `input` and `textarea` do.

Writing custom Control Value Accessors can be hard, so we provide a series of working examples to get you started.

To try it out, please manually add the directives found in the [example project](https://github.com/telekom/scale/tree/main/examples/angular-reactive-forms/src/directives) to your project and load it in `app.module.ts`:

```ts
// src/app/app.module.ts
import { ReactiveFormsModule } from '@angular/forms';

import { TextValueAccessorDirective } from 'src/directives/text-value-accessor';
import { CheckedValueAccessorDirective } from 'src/directives/checked-value-accessor';
import { NumberValueAccessorDirective } from 'src/directives/number-value-accessor';

@NgModule({
  declarations: [
    // ...
    TextValueAccessorDirective,
    CheckedValueAccessorDirective,
    NumberValueAccessorDirective,
  ],
  imports: [
    // don't forget to import the `ReactiveFormsModule`
    ReactiveFormsModule,
  ],
})
export class AppModule {}
```

## Proxy Package

The automatically generated proxy packages will be removed in v4:

- `@telekom/scale-components-angular`
- `@telekom/scale-components-angular-neutral`

Please use `@telekom/scale-components` directly, support for custom elements is already great.
