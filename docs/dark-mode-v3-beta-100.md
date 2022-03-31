# Dark mode (`3.0.0-beta.100`), changes in CSS

For developers and teams using Scale with style customisations that involve overwriting the --scl prefixed CSS variables (e.g. `--scl-color-blue-60`), updating will require a bit of work from your side. For the rest, the update should require no extra work and can be considered non-breaking.

## No work needed

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

## Bit of work needed

It will require work, if:

⚠️ you overwrite --scl prefixed variables, e.g.

```css
#my-app {
  --scl-color-primary: tomato;
}
```

## On --scl prefixed variables

The `--scl` prefixed variables will continue to be available until the next major release (v4).

It is recommended however that you replace those with the equivalents in the new [`@telekom/design-tokens` package](https://www.npmjs.com/package/@telekom/design-tokens).
