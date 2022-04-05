## v1 to v2 migration guide

If you have been part of our closed beta phase, you have been running the first version of scale. The current version 2 offers numerous bugfixes, AA accessibility and full browser support. We upgraded to Stencil 2 and are using CSS instead of JSS now, amongst others.

You need to load this CSS file at `@telekom/scale-design-tokens/dist/design-tokens-telekom.css` to get the tokens and fonts.

In this document you'll find a list of all the breaking changes in v2 and how to upgrade from v1. If a component you're interested in is not listed, it has no breaking changes.

- [Accordion](#accordion)
- [BrandHeader](#brand-header)
- [Button](#button)
- [Card](#card)
- [Icon](#icon)
- [Input](#input)
- [List](#list)
- [Modal](#modal)
- [Tab Navigation](#tab-navigation)
- [Tag](#tag)
- [Changes in styling](#changes-in-styling)

### Accordion

`scale-accordion` and `scale-collapsible`

#### Markup and slots

For `scale-collapsible`:

- Removed slot `headline`
- Removed slot `content`

Both slots have been replaced with plain markup. The first element must be a heading of the appropriate level —usually an h2 or h3, but this will dependent on each context.

Before:

```html
<scale-accordion>
  <scale-collapsible>
    <scale-text slot="headline" variant="collapsible">
      Dies ist eine Headline
    </scale-text>
    <p slot="content">Dies ist ein Copytext</p>
  </scale-collapsible>
</scale-accordion>
```

After:

```html
<scale-accordion>
  <scale-collapsible>
    <h2>Dies ist eine Headline</h2>
    <p>Dies ist ein Copytext</p>
  </scale-collapsible>
</scale-accordion>
```

### Brand Header

The `iconNavigation` configuration has changed. The `icon` property is now taking any icon name from the [Icon Library](./?path=/docs/components-icon--icon-library).

Before:

```js
export const iconNavigation = [
  { name: 'Search', id: 'Search35', href: '#search', icon: 'search' },
  { name: 'Cart', id: 'Cart36', href: '#cart', icon: 'shopping-bag' },
  { name: 'Login', id: 'Login37', href: '#login', icon: 'profile' },
  { id: 'menu', defaultName: 'Menu', openedName: 'Close' },
];
```

After:

```js
export const iconNavigation = [
  { name: 'Search', id: 'Search35', href: '#search', icon: 'action-search' },
  { name: 'Cart', id: 'Cart36', href: '#cart', icon: 'action-shopping-cart' },
  { name: 'Login', id: 'Login37', href: '#login', icon: 'user-file-user' },
  { id: 'menu', defaultName: 'Menu', openedName: 'Close' },
];
```

Please see the [Component Stories](./?path=/docs/components-brand-header-navigation--standard) for all the possible customization options available in v2.

### Button

`scale-button`

#### Attributes

- Removed `focusable`
- Removed `icon`
- Removed `iconAfter`
- Removed `iconBefore`
- Removed `iconSize`
- Removed `role`
- Added `iconOnly` (optional) - Set to `true` when the button contains only an icon and no label
- Added `iconPosition` (optional) - The icon position related to the label

#### Methods

- Removed `disable`
- Removed `enable`

#### Markup and slots

Icons are now part of the markup and no longer provided via attributes.

```html
<scale-button
  icon-before="M10 2a8 8 0 016.472 12.703l4.912 4.913.06.065a1.25 1.25 0 01-1.726 1.794l-.102-.091-4.913-4.912A8 8 0 1110 2zm0 1.5A6.508 6.508 0 003.5 10c0 3.584 2.916 6.5 6.5 6.5s6.5-2.916 6.5-6.5-2.916-6.5-6.5-6.5z"
>
  Search
</scale-button>
```

After:

```html
<scale-button><scale-icon-action-search />Search</scale-button>
```

### Card

`scale-card`

#### Attributes

- Removed `disabled`
- Removed `href`
- Removed `interactive`
- Removed `no-padding`
- Added `to` (optional) - Link URL
- Added `rel` (optional) - `rel` attribute
- Added `label` (optional) - Label for the card (a11y)

### Icon

`scale-icon`

#### Attributes

- Added `accessibilityTitle` (optional) - When using the icon as standalone, make it meaningful for accessibility
- Added `decorative` (optional) - If `true` the svg element will get aria-hidden="true"

### List

`scale-list` and `scale-list-item`

#### Attributes

For `scale-list`:

- Removed `variant`
- Added `ordered` (optional) - Make the list ordered (ol)

For `scale-list-item`:

- Removed `icon`
- Removed `iconSize`
- Removed `type`
- Added `index` (optional) - Index number, useful only for styling the `ordered` type
- Added `marker` (optional) - If false, no marker or left padding will be visible
- Added `ordered` (optional) - Whether this is a child of an ordered scale-list, gets set automatically by its parent

#### Markup and slots

Lists are unordered by default (ul), to make it ordered (ol) use the `ordered` attribute.

Before:

```html
<scale-list variant="unordered">
  <scale-list-item>Uno</scale-list-item>
  <scale-list-item>Dos</scale-list-item>
  <scale-list-item>Tres</scale-list-item>
</scale-list>
```

After

```html
<scale-list>
  <scale-list-item>Uno</scale-list-item>
  <scale-list-item>Dos</scale-list-item>
  <scale-list-item>Tres</scale-list-item>
</scale-list>
```

Icons are now part of the markup and no longer provided via attributes.

Before:

```html
<scale-list>
  <scale-list-item icon="SVG-PATH" icon-size="16">Uno</scale-list-item>
  <scale-list-item icon="SVG-PATH" icon-size="16">Dos</scale-list-item>
  <scale-list-item icon="SVG-PATH" icon-size="16">Tres</scale-list-item>
</scale-list>
```

After:

```html
<scale-list>
  <scale-list-item marker="false">
    <scale-icon-navigation-right size="16" decorative /> Uno
  </scale-list-item>
  <scale-list-item marker="false">
    <scale-icon-navigation-right size="16" decorative /> Dos
  </scale-list-item>
  <scale-list-item marker="false">
    <scale-icon-navigation-right size="16" decorative /> Tres
  </scale-list-item>
</scale-list>
```

### Input

We have split the scale-input into several stand-alone components:

- scale-checkbox
- scale-dropdown
- scale-radio-button
- scale-text-field
- scale-textarea

The attributes are not changed with one exception: `type` got removed from all new components but the `text-field`
where it still makes sense to provide one of the [standard input type values](https://www.w3schools.com/html/html_form_input_types.asp).

#### Markup and slots

Before:

```html
<scale-input type="checkbox"></scale-input>
```

```html
<scale-input type="select"></scale-input>
```

```html
<scale-input type="radio"></scale-input>
```

```html
<scale-input type="text"></scale-input>
```

```html
<scale-input type="textarea"></scale-input>
```

After:

```html
<scale-checkbox></scale-checkbox>
```

```html
<scale-dropdown></scale-dropdown>
```

```html
<scale-radio-button></scale-radio-button>
```

```html
<scale-text-input></scale-text-input>
```

```html
<scale-textarea></scale-textarea>
```

The original `scale-input` is still available with a deprecation warning. It is to be removed in v3.

### Modal

#### Attributes

- Removed `transitions`
- Added `alignActions` (optional) - Alignment of action buttons
- Added `closeButtonLabel` (optional) - Label for close button
- Added `duration` (optional) - Transition duration
- Added `heading` - Modal heading

#### Events

- Added `scaleOpen`

#### Markup and slots

- Removed slot `header`
- Removed slot `modal-actions`
- Added slot `action`

The heading is provided via the `heading` attribute.

Before:

```html
<scale-modal>
  <span slot="header">Good morning</span>
</scale-modal>
```

After:

```html
<scale-modal heading="Good morning"></scale-modal>
```

Action buttons use the `action` slot and no longer need a wrapper. The component takes care of alignment and spacing.

Before:

```html
<span slot="modal-actions">
  <scale-button
    variant="secondary"
    style="margin-right: 8px"
    @click="opened = false"
  >
    Cancel
  </scale-button>
  <scale-button @click="handleSubmit"> Submit </scale-button>
</span>
```

After:

```html
<scale-button slot="action" variant="secondary" @click="opened = false">
  Cancel
</scale-button>
<scale-button slot="action" @click="handleSubmit"> Submit </scale-button>
```

Order in markup is important. Put the modal's content first and then any action buttons.

### Tab Navigation

`scale-tab-nav`, `scale-tab-header` and `scale-tab-panel`

#### Attributes

For `scale-tab-nav`:

- Removed `ariaLabel`
- Added `small` (optional) - Set to `true` for smaller height and font size in tab headers

For `scale-tab-header`:

- Removed `icon`
- Removed `iconOnly`
- Removed `iconSize`
- Removed `label`

For `scale-tab-panel`:

- Removed `ariaLabel`
- Removed `identifier`

#### Events

For `scale-tab-nav`:

- Removed `tabclick`

#### Markup and slots

Slots has been renamed and the `label` attribute removed in favor of slotted text.

- Renamed slot `headings` to `tab`
- Renamed slot `content` to `panel`

Before:

```html
<scale-tab-nav>
  <scale-tab-header slot="headings" label="General"></scale-tab-header>
  <scale-tab-panel slot="content">
    Freegan kinfolk farm-to-table humblebrag cred…
  </scale-tab-panel>
</scale-tab-nav>
```

After:

```html
<scale-tab-nav>
  <scale-tab-header slot="tab">General</scale-tab-header>
  <scale-tab-panel slot="panel">
    Freegan kinfolk farm-to-table humblebrag cred…
  </scale-tab-panel>
</scale-tab-nav>
```

Icons are now part of the markup and no longer provided via attributes. The icon-only option is no longer supported.

Before:

```html
<scale-tab-header
  slot="headings"
  icon="{SVG_PATH}"
  label="General"
></scale-tab-header>
```

After:

```html
<scale-tab-header slot="tab">
  <scale-icon-home-home size="16" /> General
</scale-tab-header>
```

### Tag

#### Attributes

- Added `dismissText` (optional) - Dismiss label for accessibility

### Changes in styling

- the JSS-related theming API (`useTheme` and `getTheme`) has been removed
- the `customClass` attribute has been removed
- the `styles` attribute now accepts a string of plain CSS instead of an object
