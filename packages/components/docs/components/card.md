---
layout: default
title: Card
---

# Card

A Card component

selector: `t-card`

## Default
<div class="demo-container">
	<t-card>Card content</t-card>
</div>

```html
<t-card>Card content</t-card>
```

## With Header
<div class="demo-container">
	<t-card>
		<h3 slot="header">Header content</h3>
		Card content
	</t-card>
</div>

```html
<t-card>
  <h3 slot="header">Header content</h3>
  Card content
</t-card>
```

## With Footer
<div class="demo-container">
	<t-card>
		Card content
		<h3 slot="footer">Footer content</h3>
	</t-card>
</div>

```html
<t-card>
  Card content
  <h3 slot="footer">Footer content</h3>
</t-card>
```

## With Image
<div class="demo-container">
	<t-card image-top="http://placehold.it/400x300" image-top-alt="Image alt text">
	Card content
	</t-card>
</div>

```html
<t-card image-top="http://placehold.it/400x300" image-top-alt="Image alt text">
  Card content
</t-card>
```
