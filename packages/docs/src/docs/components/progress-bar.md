---
title: Progress Bar
description: Progress Bar element
url: /docs/progress-bar
contributors:
  - SylviaGonschior
---

# Progress Bar

Progress Bar component

selector: `t-progress-bar`

## Show progress percentage outside of bar

```javascript
<t-progress-bar
  percentage="30"
  variant="info"
  show-text="true"
  stroke-width="6"
></t-progress-bar>
```

<div class="demo-container">
  <t-progress-bar
      percentage="30"
      variant="info"
      show-text="true"
      stroke-width="6"
    ></t-progress-bar>
</div>

## Show progress percentage inside of the bar

```javascript
<t-progress-bar
  percentage="80"
  variant="info"
  text-inside="true"
  stroke-width="18"
></t-progress-bar>
```

<div class="demo-container">
  <t-progress-bar
      percentage="80"
      variant="info"
      text-inside="true"
      stroke-width="18"
    ></t-progress-bar>
</div>

## Variants

Available `variants`:

- info
- warning
- danger
- success

```javascript
<t-progress-bar
  percentage="80"
  variant="warning"
  show-text="true"
  stroke-width="6"
></t-progress-bar>
```

<div class="demo-container">
  <t-progress-bar
      percentage="80"
      variant="warning"
      show-text="true"
      stroke-width="6"
    ></t-progress-bar>
</div>

```javascript
<t-progress-bar
  percentage="50"
  variant="danger"
  show-text="true"
  stroke-width="6"
></t-progress-bar>
```

<div class="demo-container">
  <t-progress-bar
      percentage="50"
      variant="danger"
      show-text="true"
      stroke-width="6"
    ></t-progress-bar>
</div>

```javascript
<t-progress-bar
  percentage="100"
  variant="success"
  show-text="true"
  stroke-width="6"
></t-progress-bar>
```

<div class="demo-container">
  <t-progress-bar
      percentage="100"
      variant="success"
      show-text="true"
      stroke-width="6"
    ></t-progress-bar>
</div>
