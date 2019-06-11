![Telements](assets/telements-banner-ascii-light.jpg)

The `telements` library offers a set of customizable UI components written in `TypeScript`. The default `theme` of the library can be easily replaced so that a corresponding corporate identity of a dedicated brand can be represented.

![Telements badge](https://img.shields.io/badge/telekom-telements-%23e20074.svg) ![GitHub License](https://img.shields.io/github/license/telekom/telements.svg?style=flat-square) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/telekom/telements.svg?style=flat-square) ![GitHub repo size](https://img.shields.io/github/repo-size/telekom/telements.svg?style=flat-square)

## Telements Monorepo

### Setup

This repository uses `yarn workspaces` and `typescript`

### Running locally

#### 1. Clone this repository to a local folder of your choice

```bash
cd path-to/folder-name
git clone git@github.com:telekom/telements.git
cd telements
git checkout development
```

#### 2. Install dependencies

This repository uses `yarn workspaces`, for the symlinks to work correctly please use `yarn` in favour of `npm`

```bash
yarn
```

#### 3. Build packages

```bash
# you'll need to build at least the components to be available for boilerplates
yarn build:components

# you'll need to run this if you want to deploy one or more boilerplates
yarn build:boilerplates

# run all above commands sequentially  
yarn build
```

#### 4. Watch components for development

> **NOTE:** Currently, every `components-{target}` needs to be watched independently, to do so please open a new `terminal` tab for each one you want to watch

> **TODO:** Explore possibilities to watch all (selected) `components-{target}` packages with a `watch` command at once. E.g. `npm-run-all`

```bash
# Styles: All `components-{target}` packages depend on the `styles` package
# Make sure you watch it, if you modify its source files
yarn watch:styles

# HTML
yarn watch:components:html

# Web Components
yarn watch:components:web

# React
yarn watch:components:react

```

#### 5. Serve Boilerplates

> **NOTE:** Currently, every `boilerplate` needs to be served independently, to do so please open a new `terminal` tab for each one you want to serve

> **TODO:** Explore possibilities to launch all (selected) packages with a `watch` command at once. E.g. `npm-run-all`

```bash
# React
yarn start:react

# Next
yarn start:next

# Vue
yarn start:vue

# Angular
yarn start:angular
```

### Packages

All packages maintained with this monorepo are listed below.

| Package	| Version	| Description |
|---			|---	|---|
| boilerplate-angular | 0.0.1 | Angular app example with `web-components` |
| boilerplate-next | 0.0.1 | Next app example with server-side-rendered `react-components` |
| boilerplate-react | 0.0.1 | React app example with `react-` and `web-components`|
| boilerplate-vue | 0.0.1 | Vue app example with `web-components` |
| cli | x.x.x | TODO: Command line interface for better development experience |
| components-html | 0.0.1 | Component Library as plain HTML + CSS + JS version |
| components-react | 0.0.1 | Component Library as React Components |
| components-web | 0.0.1 | Component Library as Web Components |
| config | x.x.x | TODO: Shared configuration |
| docs | x.x.x | TODO: Documentation |
| util | x.x.x | TODO: Shared helper functions |
| styles | 0.0.1 | Shared styles |

### Contributing

We strongly recommend that the community help us make improvements and determine the future direction of the library. To report bugs within this package, please create an issue in this repository.

#### Telements Contribution Guide

We welcome contributions from anyone on the internet and are grateful for even the smallest contributions. This document will help get you setup to start contributing back to `telements`.

##### Getting started

1. Fork `telekom/telements`
2. Clone your fork
3. Follow the installation & build steps in the repo's top-level README.
4. Setup the recommended Development Tooling.
5. Open a `PR` with the `[WIP]` flag against the `development` branch and describe the change you are intending to undertake in the `PR description`. (see our branch naming conventions)
6. Before removing the `[WIP]` tag and submitting the `PR` for review, make sure:
7. **TODO:** It passes our linter checks: `yarn lint`
8. **TODO:** It is properly formatted with Prettier: `yarn prettier`
9. **TODO:** It passes our continuous integration tests (See: Enabling code coverage checks on your fork for instructions on getting the submit-coverage test to pass on forks)
10. You've created/updated the corresponding `CHANGELOG` entries.
11. Your changes have sufficient test coverage (e.g regression tests have been added for bug fixes)

##### Branch structure

We have two main branches: 

- `master`: represents the most recently released (published on npm) version of the codebase.
- `development`: represents the current development state of the codebase.

ALL `PRs` should be opened against the`development` branch.

Branch names should be prefixed with `fix`, `feature` or `refactor`.

e.g `fix/broken-wiki-link`
If the `PR` only edits a single package, add it's name too
e.g `fix/website/broken-wiki-link`
CHANGELOGs

**TODO**: Setup versioning

> 
> This is an Example
>
> We use Semantic Versioning for all our published packages. If a change you make corresponds to a semver bump, you must modify the package's CHANGELOG.json file accordingly.

>
> Each CHANGELOG entry that corresponds to a published package will have a timestamp. If no entry exists without a timestamp, you must first create a new one:

>
> ```js
> {
>     "version": "1.0.1", // The updated package version
>     "changes": [
>         {
>             "note": "", // Describe your change
>             "PR": 100 // Your PR number
>         }
>     ]
> }
> ```
>
> If an entry without a timestamp already exists, this means other changes have been introduced by other collaborators since the last publish. Add your changes to the list of notes and adjust the version if your PR introduces a greater semver change (i.e current changes required a patch bump, but your changes require a major version bump).

##### Development Tooling

We strongly recommend you use the `VSCode text editor` since most of our code is written in `Typescript` and it offers amazing support for the language.

##### Linter

We use `TSLint` with custom configs to keep our code-style consistent.


**TODO**: Setup yarn:lint

>
Use yarn:lint to lint the entire monorepo, and PKG={PACKAGE_NAME} yarn lint to lint a specific package.

>
If you want to change a rule, or add a custom rule, please make these changes to our tslint-config package. All other packages have it as a dependency.

Integrate it into your text editor:

- VSCode: vscode-tslint
- Atom: linter-tslint
- Auto-formatter

**TODO**: Setup prettier

>
We use Prettier to auto-format our code. Be sure to either add a text editor integration or a pre-commit hook to properly format your code changes.

We recommend you install the following packages:

- VSCode: prettier-vscode
- Atom: prettier-atom

##### Unenforced coding conventions

A few of our coding conventions are not yet enforced by the linter/auto-formatter. Be careful to follow these conventions in your PR's.

