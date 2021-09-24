import {
  Meta,
  Story,
  ArgsTable,
  Canvas,
  Description,
} from '@storybook/addon-docs/blocks';
import ScaleBadge from './ScaleBadge.vue';

<Meta
  title="Beta Components/Badge"
  component={ScaleBadge}
  argTypes={{
    color: {
      defaultValue: 'primary',
      options: ['primary', 'white', 'black', 'blue'],
      control: {
        type: 'select',
      },
    },
    size: {
      defaultValue: 'large',
      options: ['small', 'large'],
      control: {
        type: 'select',
      },
    },
  }}
/>

export const Template = (args, { argTypes }) => ({
  components: { ScaleBadge },
  props: ScaleBadge.props,
  template: `
      <scale-badge :size="size" :color="color" :rotation="rotation">
      <div>
        <div style="text-align:center; font-size:20px; color:white; font-weight:400;">
          Für nur 
        </div>
        <div style="text-align:center; font-size: 60px; color: white; font-weight: 700;">
          <span>
            15 €
          </span>
        </div>
      </div>
    </scale-badge>
  `,
});

export const Template2 = (args, { argTypes }) => ({
  components: { ScaleBadge },
  props: ScaleBadge.props,
  template: `
      <scale-badge :size="size" :color="color" :rotation="rotation">
      <div>
        <div style="text-align: center; font-size: 15px; color: white; font-weight: 400; margin-bottom: 10px;">
          Für nur
        </div>
        <div style="text-align: center; font-size: 40px; color: white; font-weight: 700;">
          <span>
            15 €
          </span>
        </div>
      </div>
    </scale-badge>
  `,
});

export const Template3 = (args, { argTypes }) => ({
  components: { ScaleBadge },
  props: ScaleBadge.props,
  template: `
      <scale-badge :size="size" :color="color" :rotation="rotation">
      <div>
        <div style="text-align: center; font-size: 25px; color: white; font-weight: 400; margin-bottom: 10px;">
          ab
        </div>
        <div style="text-align: center; font-size: 35px; color: white; font-weight: 700;">
          <span>
            19,95 €
          </span>
          <sup title="This offer is only valid for a limited time. Free shipping on all orders." style="font-size: 30px; color: white; cursor: help;">*</sup>
        </div>
      </div>
    </scale-badge>
  `,
});

## Standard
### All default values
<Canvas withSource="none">
  <Story
    name="Standard"
    args={{
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

<ArgsTable story="Standard" />

```html
<scale-badge>
  <div>
    <div
      style="text-align:center; font-size:20px; color:white; font-weight:400;"
    >
      Für nur
    </div>
    <div
      style="text-align:center; font-size: 60px; color: white; font-weight: 700;"
    >
      <span> 15 € </span>
    </div>
  </div>
</scale-badge>
```

### Scoped CSS variables
```css
 :host {
  --color-badge: var(--scl-color-primary);
  --inner-width-small: var(--scl-spacing-80);
  --inner-height-small: var(--scl-spacing-80);
  --inner-width-large: 126.5px;
  --inner-height-large: 96px;
  --width-small: 120px;
  --height-small: 120px;
  --height-large: 160px;
  --width-large: 160px;
  --blue-badge: var(--scl-color-blue-60);
  --white-badge: var(--scl-color-white);
  --black-badge: var(--scl-color-black);
  --primary-badge: var(--scl-color-primary);
}
}
```
## Size
There are two sizes: 
Large / small. Large has the size 160x160 and small 120x120. In the example below, the badge is small

<Canvas withSource="none">
  <Story
    name="Sizes"
    args={{
      size: "small",
      color: "blue",
    }}
  >
    {Template2.bind({})}
  </Story>
</Canvas>

```html
<scale-badge color="blue" size="small" >
  <div>
    <div
      style="text-align:center; font-size:20px; color:blwhiteack; font-weight:400;"
    >
      Für nur
    </div>
    <div
      style="text-align:center; font-size: 60px; color: white; font-weight: 700;"
    >
      <span> 15 € </span>
    </div>
  </div>
</scale-badge>
```

## Rotation
<Canvas withSource="none">
  <Story
    name="Rotation"
    args={{
      size: "small",
      color: "blue",
      rotation: 33,
    }}
  >
    {Template2.bind({})}
  </Story>
</Canvas>

```html
<scale-badge color="blue" size="small" rotation="33" >
  <div>
    <div
      style="text-align:center; font-size:20px; color:blue; font-weight:400;"
    >
      Für nur
    </div>
    <div
      style="text-align:center; font-size: 60px; color: white; font-weight: 700;"
    >
      <span> 15 € </span>
    </div>
  </div>
</scale-badge>
```

## Color Choosing
There are 4 standard colors (Primary - default, black, white, blue). The user also has the possibilty to determine another color by accessing the specific css class. 

<Canvas withSource="none">
  <Story
    name="Color Choosing"
    args={{
      size: "small",
    }}
  >
    {Template2.bind({})}
  </Story>
</Canvas>

```html
<scale-badge size="lare"  rotation="0">
      <div>
        <div style="text-align:center; font-size:20px; color:white; font-weight:400;">
          Für nur
        </div>
        <div style="text-align:center; font-size: 60px; color: white; font-weight: 700;">
          <span>
            15 €
          </span>
        </div>
      </div>
</scale-badge>
```

## Asterisk
<Canvas withSource="none">
  <Story
    name="Asterisk"
    args={{
      size: "large",
    }}
  >
    {Template3.bind({})}
  </Story>
</Canvas>

```html
<scale-badge size="large" color="primary" rotation="0">
      <div>
        <div style="text-align: center; font-size: 25px; TeleNeo; color: white; font-weight: 400; margin-bottom: 10px;">
          ab
        </div>
        <div style="text-align: center; font-size: 35px; TeleNeo; color: white; font-weight: 700;">
          <span>
            19,95 €
          </span>
          <sup title="This offer is only valid for a limited time. Free shipping on all orders." style="font-size: 30px; color: white; cursor: help;">*</sup>
        </div>
      </div>
</scale-badge>
```