# Deprecated packages removed

Date: 2026-10-06

The following packages have been deprecated for a long time and are now removed from the Scale repository:

- `@telekom/scale-components-angular`, including its neutral variant.
- `@telekom/scale-components-vue`, including its neutral variant.
- `@telekom/scale-design-tokens`, including its neutral variant.

Their source directories, generation targets, build steps, dependencies, and publishing steps have been removed. This change does not unpublish existing npm versions. These packages will not receive new releases from this repository.

## Angular and Vue

Angular and Vue support Web Components natively. Use `@telekom/scale-components` directly, or `@telekom/scale-components-neutral` for the neutral theme. Load the component CSS and register the custom elements:

```javascript
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import { defineCustomElements } from '@telekom/scale-components/loader';

defineCustomElements(window);
```

Use Angular's `CUSTOM_ELEMENTS_SCHEMA` or Vue's custom-element configuration. For Vue 3, set `compilerOptions.isCustomElement` to recognize `scale-` tags. Register custom elements only on the client in server-rendered applications.

For ordinary component use, replace the wrapper dependency and imports with the core package, load its CSS, register the custom elements, and configure the framework as described above. The `scale-` elements and their properties and events remain available.

Changing only the package name is not sufficient if your application uses a wrapper's form integration. Angular does not automatically connect a custom element to `formControlName`, `[formControl]`, or `ngModel`; retain or add a `ControlValueAccessor` for the controls you use. The Angular reactive-form examples already include these application directives. Vue's native custom elements do not use the removed wrapper's `v-model` integration; bind the component value and its `scale-change` or `scale-input` event explicitly instead.

Applications that already use the core package and these native bindings need no wrapper migration. The [Angular guide](https://telekom.github.io/scale/?path=/docs/setup-info-scale-and-angular--page) and [Vue guide](https://telekom.github.io/scale/?path=/docs/setup-info-scale-and-vue--page) describe the integration steps.

## Design tokens

Scale already uses the independent [`@telekom/design-tokens`](https://www.npmjs.com/package/@telekom/design-tokens) package, maintained in the [Telekom design-tokens repository](https://github.com/telekom/design-tokens). Its version is independent of Scale's version. Use this package if your application imports tokens directly. The component CSS continues to include the required tokens.

## Compatibility

Consumers that import a retired wrapper or token package must migrate before adopting this change. The core Web Components, React wrapper, neutral themes, and existing legacy CSS token aliases are retained. Historical changelogs remain unchanged.
