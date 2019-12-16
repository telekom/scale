---
title: Getting Started
description: Getting Started
url: /docs/getting-started
contributors:
  - eeegor
  - steffilankes
  - SylviaGonschior
  - maomaoZH
  - tomhoefer
---

# Getting Started

## Starting a new project

Stencil requires a recent LTS version of [NodeJS](https://nodejs.org/) and npm. Make sure you've installed and/or updated Node before continuing.

> Note that you will need to use npm 6 or higher.

```bash
 npm init stencil
```

Stencil can be used to create standalone components, or entire apps. After running init
you will be provided with a prompt so that you can choose the type of project to start.

```bash
? Pick a starter › - Use arrow-keys. Return to submit.

❯  ionic-pwa     Everything you need to build fast, production ready PWAs
   app           Minimal starter for building a Stencil app or website
   component     Collection of web components that can be used anywhere
```


## Updating Stencil

To get the latest version of @stencil/core you can run:

```bash
npm install @stencil/core@latest --save-exact
```
