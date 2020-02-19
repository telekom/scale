---
title: Link
description: Link element
url: /docs/link
contributors:
  - maomaoZH
---

# Link

Link component

selector: `t-link`

## Default

```javascript
<t-link href="http://example.com" open-new-tab="true">
  default
</t-link>
```

<div class="demo-container">
  <t-link
     href="http://example.com" open-new-tab="true">default</t-link>
</div>

```javascript
<t-link>default without underline</t-link>
```

<div class="demo-container">
  <t-link>default without underline</t-link>
</div>

## Link disabled

```javascript
<t-link href="http://example.com" disabled="true">
  default
</t-link>
```

<div class="demo-container">
  <t-link href="http://example.com" disabled="true">default</t-link>
</div>

## Link on hover with underline

```javascript
<t-link underline="true">with underline</t-link>
```

<div class="demo-container">
   <t-link underline="true">with underline</t-link>
</div>

## Variants

Available `variants`:

- info
- warning
- danger
- success
- primary

```javascript
<t-link variant="info">info</t-link>
```

<div class="demo-container">
  <t-link variant="info">info</t-link>
</div>

```javascript
<t-link variant="info" disabled="true">
  info
</t-link>
```

<div class="demo-container">
  <t-link variant="info" disabled="true">info</t-link>
</div>

```javascript
<t-link variant="warning">warning</t-link>
```

<div class="demo-container">
  <t-link variant="warning">warning</t-link>
</div>

```javascript
<t-link variant="warning" disabled="true">
  warning
</t-link>
```

<div class="demo-container">
  <t-link variant="warning" disabled="true">warning</t-link>
</div>

```javascript
<t-link variant="danger">danger</t-link>
```

<div class="demo-container">
  <t-link variant="danger">danger</t-link>
</div>

```javascript
<t-link variant="danger" disabled="true">
  danger
</t-link>
```

<div class="demo-container">
  <t-link variant="danger" disabled="true">danger</t-link>
</div>

```javascript
<t-link variant="success">success</t-link>
```

<div class="demo-container">
  <t-link variant="success">success</t-link>
</div>

```javascript
<t-link variant="success" disabled="true">
  success
</t-link>
```

<div class="demo-container">
  <t-link variant="success" disabled="true">success</t-link>
</div>

```javascript
<t-link variant="primary">primary</t-link>
```

<div class="demo-container">
  <t-link variant="primary">primary</t-link>
</div>

```javascript
<t-link variant="primary" disabled="true">
  primary
</t-link>
```

<div class="demo-container">
  <t-link variant="primary" disabled="true">primary</t-link>
</div>
