![Scale](https://raw.githubusercontent.com/telekom/scale/main/assets/Scale%20-%20The%20Telekom%20Digital%20Design%20System.png)

Scale is the digital design system for Telekom products and experiences. By default, Scale is built to align with our corporate brand and design but allows for easy customization to fit your particular product. It helps you build your digital products faster and create superior experiences with ease. With production-ready components for code and design, a central library, and comprehensive documentation, Scale has everything you need. Currently, Scale is an open beta.

Scale components are customizable and written in TypeScript. If you want to represent the corporate identity of a separate brand, you need to replace the Telekom default theme (see detailed instructions below).

![Scale badge](https://img.shields.io/badge/telekom-scale-%23e20074.svg) [![License: MPL-2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](./LICENSE) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/telekom/scale.svg?style=flat-square) ![GitHub repo size](https://img.shields.io/github/repo-size/telekom/scale.svg?style=flat-square)

# Welcome to Scale

Access the [comprehensive documentation for Scale](https://www.brand-design.telekom.com/scale/) on [Telekom Brand & Design](https://www.brand-design.telekom.com/).

# Customizing Scale for open source software

Although the code for Scale is free and available under the MPL 2.0 license, Deutsche Telekom fully reserves all rights to the Telekom brand. To prevent users from getting confused about the source of a digital product or experience, there are strict restrictions on using the Telekom brand and design, even when built into code that we provide. For any customization other than explicitly for the Telekom, you must replace the Deutsche Telekom default theme.

To use Scale as open source software and customize it with a neutral theme, please follow the instructions for our [open source version](#open-source-version).

## Open source version

By following the instructions for the Open Source Version you obtain source code/packages that use a neutral theme and are fully covered by the MPL-2.0 License.

### Setup with NPM

```
npm install @telekom/scale-components-neutral
```

To use the components, you need to load a CSS file and some JavaScript. The CSS file includes the fonts and design tokens.

### Setup with plain HTML

```html
<link
  rel="stylesheet"
  href="node_modules/@telekom/scale-components-neutral/dist/scale-components/scale-components.css"
/>
<script
  type="module"
  src="node_modules/@telekom/scale-components-neutral/dist/scale-components/scale-components.js"
></script>
```

### Setup with a bundler or ES modules

```javascript
import '@telekom/scale-components-neutral/dist/scale-components/scale-components.css';
import {
  applyPolyfills,
  defineCustomElements,
} from '@telekom/scale-components-neutral/loader';

applyPolyfills().then(() => {
  defineCustomElements(window);
});
```

### NPM Packages

| Package Name                              | Description                   |
| ----------------------------------------- | ----------------------------- |
| @telekom/scale-components-neutral         | Stencil components            |
| @telekom/scale-components-react-neutral   | Component proxies for React   |
| @telekom/scale-components-vue-neutral     | Component proxies for Vue     |
| @telekom/scale-components-angular-neutral | Component proxies for Angular |
| @telekom/scale-design-tokens-neutral      | Design tokens                 |

### Using the source code directly

If you want to use the source code, remove the following folders. These folders contain all the protected brand and design assets of Telekom and are not available under the MPL-2.0 License:

| Folder                                     | Content                    |
| ------------------------------------------ | -------------------------- |
| assets                                     | Scale key visual           |
| packages/components-sketch/                | Sketch generator templates |
| packages/components/src/components/telekom | Telekom components         |
| packages/components/src/telekom            | Telekom fonts & icons      |
| packages/components/src/html/telekom       | Telekom code examples      |
| packages/design-tokens/src/telekom         | Telekom design tokens      |
| packages/visual-tests/                     | Visual tests               |
| storybook-vue                              | Telekom branded storybook  |

## Telekom Version

Please note that the use of the Telekom brand and design assets – including but not limited to the logos, the color Magenta, the typeface and icons, as well as the footer and header components – are not available for free use and require Deutsche Telekom's express permission for use in commerce.

### Setup with NPM

Install the Scale component library in your project with NPM or Yarn:

```
npm install @telekom/scale-components
```

### Setup with plain HTML

```html
<link
  rel="stylesheet"
  href="node_modules/@telekom/scale-components/dist/scale-components/scale-components.css"
/>
<script
  type="module"
  src="node_modules/@telekom/scale-components/dist/scale-components/scale-components.js"
></script>
```

### Setup with a bundler or ES modules

```
import "@telekom/scale-components/dist/scale-components/scale-components.css";
import { applyPolyfills, defineCustomElements } from "@telekom/scale-components/loader";

applyPolyfills().then(() => {
  defineCustomElements(window);
});
```

### NPM Packages

| Package Name                      | Description                   |
| --------------------------------- | ----------------------------- |
| @telekom/scale-components         | Stencil components            |
| @telekom/scale-components-react   | Component proxies for React   |
| @telekom/scale-components-vue     | Component proxies for Vue     |
| @telekom/scale-components-angular | Component proxies for Angular |
| @telekom/scale-design-tokens      | Telekom design tokens         |

### Using the source code directly

Simply clone/download this repository and use the source code as-is.

## Monorepo Packages Overview

| Package Name       | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| components         | Stencil components                                         |
| components-angular | Component proxies for Angular (auto-generated)             |
| components-react   | Component proxies for React (auto-generated)               |
| components-sketch  | Component templates for Sketch generation (auto-generated) |
| components-vue     | Component proxies for Vue (auto-generated)                 |
| design-token       | Design tokens                                              |
| generator-sketch   | Sketch generator                                           |
| html-to-sketch     | Component template Sketch conversion utilities             |
| storybook-vue      | Our Storybook                                              |
| visual-tests       | Visual snapshot testing                                    |

# Contributing

## Code of Conduct

This project has adopted the [Contributor Covenant](https://www.contributor-covenant.org/) in version 2.0 as our code of conduct. Please see the details in our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). All contributors must abide by the code of conduct.

## How to Contribute

Contribution and feedback is encouraged and always welcome. For more information about how to contribute, the project structure, as well as additional contribution information, see our [Contribution Guidelines](./CONTRIBUTING.md). By participating in this project, you agree to abide by its [Code of Conduct](./CODE_OF_CONDUCT.md) at all times.

## Contributors

Our commitment to open source means that we are enabling -in fact encouraging- all interested parties to contribute and become part of its developer community.

# Licensing

Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG

Licensed under the **Mozilla Public License 2.0 (MPL-2.0)** (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License by reviewing the file [LICENSE](./LICENSE) in the repository.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [LICENSE](./LICENSE) for the specific language governing permissions and limitations under the License.

## Local development

## Get dependencies

```bash
yarn
```

## Build assets

```bash
yarn build
```

## Start development mode

```bash
yarn start
```

## Component development

## Useful commands

See the `scripts` section inside `package.json` for a list of all available commands

### Testing

| Command                           | Description                            |
| --------------------------------- | -------------------------------------- |
| `yarn test --spec`                | Run all tests                          |
| `yarn test --spec component-name` | Run all tests for a specific component |
| `yarn test --spec --watch`        | Run all tests in watch mode            |
| `yarn test --spec -u`             | Run all tests and update snapshots     |
| `yarn test --spec--coverage`      | Run all tests and show coverage        |
| `yarn test --e2e`                 | Run all visual tests                   |

> Some test commands can be combined e.g. `yarn test -u --coverage`

### Format & lint

| Command       | Description                          |
| ------------- | ------------------------------------ |
| `yarn format` | Run formatter on all supported files |
| `yarn lint`   | Run linter for all supported files   |

### Before you push

In order to satisfy the `CI` pipeline it is advised to run some scripts before pushing your changes to remote. Here some crucial ones:

`yarn format`
`yarn lint`
`yarn test --spec --e2e -u`

> If any of the above commands throw an error, please fix the errors before pushing to remote

---

Find [Telekom Scale on GitHub](https://github.com/telekom/scale).
