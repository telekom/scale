# Telekom Light and Dark Mode

## General

Light and dark mode are directed at different user groups and different use cases. This is not only about aesthetics, but also about avoiding eye strain. Be it due to ambient light or, for example, visual impairments such as cataracts.

## Light mode

Most general users without visual impairments prefer light mode, especially in a well-lit environment. As such, we recommend light mode as default, unless there are special reasons not to. However, there are also exceptions, such as Magenta TV – this platform is offered exclusively in dark mode.

## Dark mode

Dark mode is especially beneficial for users with certain visual impairments, as it makes it easier to distinguish between elements and text. Some users also benefit from the lower contrast in dark mode. Most users, even without visual impairments, prefer dark mode at night and in dimly-lit environments. This helps avoid eye strain and fatigue.

## Let your users decide

Since there are many personal reasons for choosing a mode, it’s ideal to let your users decide which mode they want to use. The preferred way of implementing light and dark mode is with a button or similar UI element that toggles between light and dark mode. If you can detect user preferences from the operating system (like via prefers-color-scheme on the web), select the preferred mode automatically.

## For designers

Scale allows you to design in either light or dark mode. Switching is possible at any time at the press of a button, so you can view your design in the other mode. But even without additional designs, the development team can activate the other mode.

### Sketch

- Go to <a href="./?path=/docs/setup-info-getting-started-for-designers--page">Getting Started for Designers</a> and import the libraries for light and dark mode.
- Design your interface with the library of your choice.
- To change the mode, go to Preferences > Libraries and select the other library. When asked, select "Replace". Close the preferences window.
- In Sketch, click the notification icon (bell) in the upper right corner and select "Component updates available".
- Select "Update components".
- Now your design will appear in the other mode.

### Figma

## For Developers:

Dark mode is included in Scale from version `3.0.0-rc.1`. It leverages CSS variables to allow changing modes.

By default, the mode will be set to match the operating system preferences, via the `prefers-color-scheme` media query.

Alternatively, modes can be set via the `data-mode` attribute. The value must be either `light` or `dark`. It's recommended to do this in the `body`, e.g. `<body data-mode="light">`, though it's possible to also switch only a specific part of the page.

Setting the `data-mode` attribute will override the system preferences.

### Adding a switch

A switch can be built into the UI with a bit of JavaScript, to set the `data-mode` attribute accordingly. The following snippet should serve as an illustration:

```js
const element = document.querySelector('.mode-switch')

element.addEventListener('click', function switchMode() {
  const isDark = document.body.dataset.mode === 'dark'
  document.body.dataset.mode = isDark ? 'light' : 'dark'
})
```

In JavaScript, you can check and monitor the system preference via the window.matchMedia method.

```js
const mq = window.matchMedia('(prefers-color-scheme: dark)')
const isDark = mq.matches
```

### Disabling automatic switching

If you want your app to be in either light or dark mode regardless of the user's system preferences, set the `data-mode` attribute to the desired mode:

```html
<body data-mode="light">
```
