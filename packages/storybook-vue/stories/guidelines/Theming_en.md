# Customization and Themes

Most Scale components use the shadow DOM to encapsulate styles, so you can't modify their styles by targeting them with a plain CSS selector. To allow for customization, however, each component exposes a set of **scoped CSS variables** and **shadow parts**.

Customization is possible at different levels. For instance, you can:

- customize a single instance of a component,
- _extend_ or create a new "variant" of a component, or
- create a theme that groups a set of customizations.

By default, components are styled using Scale's design tokens. These are CSS variables defined in `:root` in the `scale-components.css` file. When customizing elements, always try and use a limited set of design tokens – either the system's, your own, or both – to keep your UI consistent.

To learn more about CSS custom properties (also called variables) and shadow parts, please refer to:

- [Using CSS custom properties (variables) on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [A user's guide to CSS variables by Lea Verou](https://increment.com/frontend/a-users-guide-to-css-variables/)
- [::part on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)
- [CSS Shadow Parts spec draft at W3C](https://drafts.csswg.org/css-shadow-parts-1/#part)

## Customization options

### Component-scoped variables

You can overwrite a component's variables in your CSS.

```css
scale-button {
  --radius: 0;
}
```

Creating variants is also possible by grouping overwrites in a CSS selector, like a class or an attribute.

```html
<style>
  scale-button.squared {
    --radius: 0;
  }
</style>

<scale-button class="squared">Sign in</scale-button>
```

An attribute doesn't need to exist in the component for you to use it as a selector; you can use anything as long as it's a valid CSS selector.

```html
<style>
  scale-button[variant='squared'] {
    --radius: 0;
  }
</style>

<scale-button variant="squared">Sign in</scale-button>
```

If you need to customize a single instance, you can inline it:

```html
<scale-button style="--radius: 0">Sign out</scale-button>
```

### Shadow Parts

Shadow parts make it possible to target internal elements of a component directly via the [`::part` pseudo-element selector](https://developer.mozilla.org/en-US/docs/Web/CSS/::part).

```css
scale-button::part(base) {
  border-radius: 0;
}
```

It's possible to apply the same idea of a variant.

```css
scale-button[variant='squared']::part(base) {
  border-radius: 0;
  background: var(--telekom-color-additional-teal-600);
}

scale-button[variant='squared']::part(base):hover {
  background: var(--telekom-color-additional-teal-900);
}
```

Bear in mind that the `::part` selector is limited exclusively to a single element; you can’t target descendants and siblings or chain it.

### Themes

When we group a set of style customization under the scope of a CSS class, we create a theme we can activate as easily as adding that class to the body of the document.

As an example:

```css
<style>
  .theme-example {
    --telekom-color-primary-standard: limegreen;
    --telekom-color-primary-hovered: seagreen;
    --telekom-color-primary-pressed: green;
  }

  .theme-example scale-button,
  .theme-example scale-tag,
  .theme-example scale-card {
    --radius: 2em;
  }

  .theme-example scale-button[variant="plain"]::part(base) {
    background: transparent;
    border: 2px solid currentColor;
  }
</style>

<body class="theme-example">
```
