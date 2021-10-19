# Setup for Developers

Scale provides frontend developers and engineers with a collection of reusable web components to build websites and user interfaces in major frontend frameworks like Vue, React, Angular, and HTML.

Adopting the Scale design system enables developers to use consistent markup, styles, and behavior in prototype and production work.

## Setting things up

Install the component library in your project with `npm` or `yarn`:

```bash
npm install @telekom/scale-components
```

To use the components, you need to load a CSS file and some JavaScript. The CSS file includes the fonts and the design tokens.

### Plain HTML

```bash
<link rel="stylesheet" href="node_modules/@telekom/scale-components/dist/scale-components/scale-components.css">
<script type="module" src="node_modules/@telekom/scale-components/dist/scale-components/scale-components.esm.js"></script>
```

### With a bundler or ES modules

```bash
import "@telekom/scale-components/dist/scale-components/scale-components.css";
import { defineCustomElements } from "@telekom/scale-components/loader";

defineCustomElements(window);
```

> As of July 2021, modern build tools like Vite or Snowpack will break with this lazy-loading mechanism ([see GitHub issue in Stencil's repo](https://github.com/ionic-team/stencil/issues/2827)). To work around this issue, please load the library via `link` and `script` tags as in the "Plain HTML" snippet above.

### NPM Packages

| Package Name                      | Description                   |
| --------------------------------- | ----------------------------- |
| @telekom/scale-components         | Stencil components            |
| @telekom/scale-components-react   | Component proxies for React   |
| @telekom/scale-components-vue     | Component proxies for Vue     |
| @telekom/scale-components-angular | Component proxies for Angular |
| @telekom/scale-design-tokens      | Telekom design tokens         |

## Frameworks

[Scale and Vue](./?path=/story/scale-for-developers-scale-and-vue--page)<br/>
[Scale and Angular](./?path=/story/scale-for-developers-scale-and-angular--page)<br/>
[Scale and React](./?path=/story/scale-for-developers-scale-and-react--page)

## Source Code on GitHub

Here you find [Telekom Scale on GitHub](https://github.com/telekom/scale/).
