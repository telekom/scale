import { Meta, Story, ArgsTable, Canvas } from '@storybook/addon-docs/blocks';
import ScaleToggleButton from './ScaleToggleButton.vue';

<Meta
  title="Beta Components/Toggle Button"
  component={ScaleToggleButton}
  argTypes={{
    variant: {
      control: { type: 'select', options: ['primary', 'secondary', 'ghost'] },
    },
    size: {
      control: { type: 'select', options: ['xs', 'small', 'regular', 'large'] },
    },
    radius: {
      control: { type: 'select', options: ['left', 'right', 'both'] },
    },
	  colorScheme: {
      control: { type: 'select', options: ['light', 'dark'] },
    },
    ariaLangDeselected: {
      control: { type: "text", },
    },
    ariaLangSelected: {
      control: { type: "text", },
    },
  }}
/>

export const Template = (args, { argTypes }) => ({
  components: { ScaleToggleButton },
  props: {
    label: String,
    icon: String,
    ...ScaleToggleButton.props,
  },
  template: `
  <scale-toggle-button
    :size="size"
    :variant="variant"
    :color-scheme="colorScheme"
    :disabled="disabled"
    :selected="selected"
    :icon-only="iconOnly"
    :radius="radius"
    :aria-label="ariaLabel"
    :aria-lang-selected="ariaLangSelected"
    :aria-lang-deselected="ariaLangDeselected"
    :styles="styles"
  >
    <scale-icon-action-search v-if="icon === 'before'" />
      {{ iconOnly !== true ? label : null }}
      <scale-icon-action-add v-if="iconOnly" />
      <scale-icon-navigation-right v-if="icon === 'after'" />
  </scale-toggle-button>
    `,
});

<div
  style={{
    display: 'inline-flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  }}
>
  <h1>Toggle Button</h1>
  <h2>A Toggle Button is meant to be used inside a Toggle Group</h2>
</div>

## Standard

<Canvas withSource="none">
  <Story
    name="Standard"
    args={{
      label: 'Label',
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

<ArgsTable story="Standard" />

```html
<scale-toggle-button>Label</scale-toggle-button>
```

## Secondary

<Canvas withSource="none">
  <Story
    name="Secondary"
    args={{
      variant: 'secondary',
      label: 'Label',
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

```html
<scale-toggle-button variant="secondary">Label</scale-toggle-button>
```

## Disabled

<Canvas withSource="none">
  <Story
    name="Disabled"
    args={{
      disabled: true,
      label: 'Label',
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

```html
<scale-toggle-button disabled>Label</scale-toggle-button>
```

## Secondary Disabled

<Canvas withSource="none">
  <Story
    name="Secondary Disabled"
    args={{
      variant: 'secondary',
      disabled: true,
      label: 'Label',
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

```html
<scale-toggle-button variant="secondary" disabled>Label</scale-toggle-button>
```

## With Icon Before

<Canvas withSource="none">
  <Story
    name="With Icon Before"
    args={{
      label: 'Label',
      icon: 'before',
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

```html
<scale-toggle-button> <scale-icon-action-search /> Label </scale-toggle-button>
```

## With Icon After

<Canvas withSource="none">
  <Story
    name="With Icon After"
    args={{
      label: 'Label',
      icon: 'after',
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

```html
<scale-toggle-button>
  Label <scale-icon-navigation-right />
</scale-toggle-button>
```

## Icon Only

<Canvas withSource="none">
  <Story
    name="Icon Only"
    args={{
      iconOnly: true,
      title: 'Search',
      ariaLabel: 'Search',
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

```html
<scale-toggle-button>
  <scale-icon-navigation-external-link/>
</scale-toggle-button>
```

## Color Scheme Dark 
### (...click toggle button)

<Canvas withSource="none">
  <Story
    name="Color Scheme Dark"
    args={{
      label: 'Label',
	    colorScheme: 'dark'
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

```html
<scale-toggle-button color-scheme="dark">Label</scale-toggle-button>
```

## Regular With Icon Before

<Canvas withSource="none">
  <Story
    name="Regular With Icon Before"
    args={{
      label: 'Label',
      icon: 'before',
	  size: 'regular'
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

```html
<scale-toggle-button size="regular" >
  <scale-icon-navigation-right /> Label
</scale-toggle-button>
```

## Small With Icon After

<Canvas withSource="none">
  <Story
    name="Small With Icon After"
    args={{
      label: 'Label',
      icon: 'after',
	  size: 'small'
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

```html
<scale-toggle-button size="small" >
  Label <scale-icon-navigation-right />
</scale-toggle-button>
```

## XS

<Canvas withSource="none">
  <Story
    name="XS"
    args={{
      label: 'Label',
	    size: 'xs'
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

```html
<scale-toggle-button size="xs">Label</scale-toggle-button>
```

## Radius Left

<Canvas withSource="none">
  <Story
    name="Radius Left"
    args={{
      label: 'Label',
	    radius: 'left'
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

```html
<scale-toggle-button radius="left">Label</scale-toggle-button>
```

## Radius Both

<Canvas withSource="none">
  <Story
    name="Radius Both"
    args={{
      label: 'Label',
	    radius: 'both'
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

```html
<scale-toggle-button radius="both">Label</scale-toggle-button>
```


## Accessibility

<Canvas withSource="none">
  <Story
    name="Accessibility"
    args={{
      label: 'Label',
      ariaLabel: 'Click me',
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

```html
<scale-toggle-button aria-label="Click me">Label</scale-toggle-button>
```


## Accessibility, German

<Canvas withSource="none">
  <Story
    name="Accessibility German"
    args={{
      label: 'Label',
      ariaLabel: 'Drück mich',
      ariaLangSelected: 'selektiert',
      ariaLangDeselected: 'deselektiert',
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

```html
<scale-toggle-button 
  aria-label="Drück mich"
  aria-lang-selected="selektiert"
  aria-lang-deselected="deselektiert">Label
</scale-toggle-button>
```
