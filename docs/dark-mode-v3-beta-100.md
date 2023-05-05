# Dark mode (`3.0.0-beta.100`)

- [Implement the dark mode](https://github.com/telekom/scale/blob/main/docs/dark-mode-v3-beta-100.md#implement-the-dark-mode)
- [Changes in CSS](https://github.com/telekom/scale/blob/main/docs/dark-mode-v3-beta-100.md#changes-in-css)

## Implement the dark mode

Dark mode is included starting with Scale version `3.0.0-beta.100`. It leverages CSS variables to allow switching modes.

By default, the mode is set to match the operating system preferences, via the `prefers-color-scheme` media query.

Alternatively, you can set the modes via the `data-mode` attribute. The value must be either `light` or `dark`. It's recommended to do this in the body, e.g. `<body data-mode="light">`, although it's also possible to only switch only a specific part of the page.

Setting the `data-mode` attribute will override the system preferences.

In order to have your app switch modes completely, not only the Scale components, use the following tokens for the body's background and text colors:

```css
body {
  background-color: var(--telekom-color-background-canvas);
  color: var(--telekom-color-text-and-icon-standard);
}
```

There are more color tokens for different situations.

### Disabling automatic switching

If you want your app to be in either light or dark mode regardless of the user's system preferences, set the data-mode attribute to the desired mode:

```html
<body data-mode="light"></body>
```

### Changing modes manually

You can build a switch into the UI with a bit of JavaScript, to set the `data-mode` attribute accordingly. The following snippet should serve as an illustration:

```js
const element = document.querySelector('.mode-switch');

element.addEventListener('click', function switchMode() {
  const isDark = document.body.dataset.mode === 'dark';
  document.body.dataset.mode = isDark ? 'light' : 'dark';
});
```

In JavaScript, you can check and monitor the system preference via the [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) method.

```js
const mq = window.matchMedia('(prefers-color-scheme: dark)');
const isDark = mq.matches;
```

## Changes in CSS

If you use Scale with style customisations that involve overwriting the --scl prefixed CSS variables (e.g. `--scl-color-blue-60`), updating from a previous beta version (`<=3.0.0-beta.54`) will require a bit of work from your side. For the rest, the update should require no extra work and **can be considered non-breaking**.

### No work needed

The update will require no work (non-breaking) if:

✅ you use ::part to add some custom CSS, e.g.

```css
scale-button::part(base) {
  background: lime;
}
```

✅ you overwrite component-scoped variables (e.g. `--background-window` for scale-modal), either in CSS or inlined in HTML, e.g.

```html
<scale-modal style="--background-window: turquoise" heading="Nice"
  >Lorem ipsum</scale-modal
>
```

✅ you use --scl prefixed variables in your own CSS, e.g.

```css
.my-own-component {
  background: var(--scl-color-grey-20);
}
```

### Bit of work needed

It will require work, if:

⚠️ you overwrite --scl prefixed variables, e.g.

```css
#my-app {
  --scl-color-primary: tomato;
}
```

### On --scl prefixed variables

The `--scl` prefixed variables will continue to be available until the next major release (v4).

### On .scl-font-variant-* CSS classes

`.scl-font-variant-*` classes will continue to work and have been updated with the latest design values from the new design tokens.

For reference, here's the list of affected classes:

- `.scl-font-variant-body`
- `.scl-font-variant-body-short`
- `.scl-font-variant-body-large`
- `.scl-font-variant-smaller`
- `.scl-font-variant-label`
- `.scl-font-variant-caption`
- `.scl-font-variant-heading-6`
- `.scl-font-variant-heading-5`
- `.scl-font-variant-heading-4`
- `.scl-font-variant-heading-3`
- `.scl-font-variant-heading-2`
- `.scl-font-variant-heading-1`

Also for reference, here's the list of the new tokens available. Use them with the `font` shorthand, e.g. `font: var(--telekom-text-style-body)`.

```css
:root {
  --telekom-text-style-footnote: 400 0.625rem/1.2 TeleNeoWeb, sans-serif;
  --telekom-text-style-small: 500 0.75rem/1.35 TeleNeoWeb, sans-serif;
  --telekom-text-style-small-bold: 700 0.75rem/1.35 TeleNeoWeb, sans-serif;
  --telekom-text-style-caption: 400 0.875rem/1.4 TeleNeoWeb, sans-serif;
  --telekom-text-style-caption-bold: 700 0.875rem/1.4 TeleNeoWeb, sans-serif;
  --telekom-text-style-body: 400 1rem/1.4 TeleNeoWeb, sans-serif;
  --telekom-text-style-body-bold: 700 1rem/1.4 TeleNeoWeb, sans-serif;
  --telekom-text-style-ui: 500 1rem/1 TeleNeoWeb, sans-serif;
  --telekom-text-style-ui-bold: 700 1rem/1 TeleNeoWeb, sans-serif;
  --telekom-text-style-lead-text: 400 1.25rem/1.4 TeleNeoWeb, sans-serif;
  --telekom-text-style-heading-6: 700 1rem/1.4 TeleNeoWeb, sans-serif;
  --telekom-text-style-heading-5: 800 1.25rem/1.4 TeleNeoWeb, sans-serif;
  --telekom-text-style-heading-4: 800 1.5rem/1.35 TeleNeoWeb, sans-serif;
  --telekom-text-style-heading-3: 800 2rem/1.25 TeleNeoWeb, sans-serif;
  --telekom-text-style-heading-2: 800 2.625rem/1.15 TeleNeoWeb, sans-serif;
  --telekom-text-style-heading-1: 800 3.375rem/1.2 TeleNeoWeb, sans-serif;
  --telekom-text-style-title-2: 800 4.25rem/1.15 TeleNeoWeb, sans-serif;
  --telekom-text-style-title-1: 800 4.75rem/1.15 TeleNeoWeb, sans-serif;
}
```
