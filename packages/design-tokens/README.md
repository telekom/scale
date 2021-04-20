# Scale Design Tokens

> The actual source of truth.

Some ideas:

- platform-agnostic
- strict naming convention (if no meaning is required, we can call it what it is)
- keep differentiation between *choices* (raw values) and *decisions* (assignments with meaning) in mind ([ref](https://lukasoppermann.medium.com/design-tokens-what-are-they-how-will-they-help-you-b73f80f602ab))
- promote consciousness about the friction between _flexibility_ and _consistency_ within the system

## Installation

Install with npm (or yarn): `npm install @telekom/scale-design-tokens`

## Usage

Currently the tokens are available as CSS variables only. Other output targets are possible.

### CSS

If you're using the Scale component library (`@telekom/scale-components`), the variables are already available for you.

If you want to use the tokens independently, import the `design-tokens-telekom.css` file in your CSS .

```css
@import '@telekom/scale-design-tokens/dist/design-tokens-telekom.css';
```

## Internals

The source is written in (type-checked, not yet) JavaScript, in `src/tokens.js`.

The `yarn build` command triggers a custom script that builds the output files in the dist/ folder.

The tokens are organized in categories, and each category has sections, which include the actual key/value pairs.

`CATEGORY-SECTION-KEY: VALUE`

The name of the token is determined by this structure. For example, if we look at the `family` section within the `font` category, we'll find at least the `sans` and `mono` values, so the tokens —in the CSS output— look like this:

```css
:root {
  /* --{namespace}-{category}-{section}-{key}: {value} */
  --scl-font-family-sans: TeleNeoWeb, sans-serif;
  --scl-font-family-mono: monospace;
}
```

Sometimes you don't need a section, for this there's the special keyword `DEFAULT` we can use to omit the section name in the resulting token name.

### Example

```js
tokens.color = {
  DEFAULT: {
    primary: palette.magenta,
  },
  text: {
    default: palette.grey90,
    error: palette.red80,
  }
};
```

Yields the following CSS:

```css
:root {
    /* COLOR */
    --scl-color-primary: rgb(226, 0, 116);
    --scl-color-text-standard: rgb(26, 26, 26);
    --scl-color-text-error: rgb(195, 28, 59);
}
```

### Creating an output target

An output target is a plain object with 4 methods and 4 props. The callbacks will fire as the tokens tree is being traversed, so you can build the contents of the output file accordingly. It has the following signature:

```js
export const target = {
  onCategory: ({ categoryName, tokens }) => {},
  onSection: ({ categoryName, sectionName, tokens }) => {},
  onValue: ({ categoryName, sectionName, key, value, tokens }) => {},
  onComplete: () => {},
  filename: 'design-tokens-telekom',
  ext: '',
  suffix: '',
  content: null,
};
```

- `filename` (string) the name of the generated file
- `ext` (string) is the extension of the output file, eg. `.css`
- `suffix` (string) *optional* if present, will be appended to the filename
- `content` (string) the actual content of the file

## TODO

- [ ] add JSDoc types and "type check" command
- [ ] document new "internal protocol" to suggest token modifications