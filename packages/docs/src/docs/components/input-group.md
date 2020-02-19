---
title: Input group
description: Input group element
url: /docs/input-group
contributors:
  - eeegor
---

# Input group

Input group component

selector: `t-input-group`

## Default

```javascript
<t-input-group>
	<t-input></t-input>
</t-input-group>
```

<div class="demo-container">
  <t-input-group>
		<t-input></t-input>
	</t-input-group>
</div>

## With label

```javascript
<t-input-group>
	<t-input-label>Name</t-input-label>
	<t-input></t-input>
</t-input-group>
```

<div class="demo-container">
  <t-input-group>
		<t-input-label>Name</t-input-label>
		<t-input></t-input>
	</t-input-group>
</div>

## With label and error

```javascript
<t-input-group>
	<t-input-label>Name</t-input-label>
	<t-input></t-input>
	<t-input-error>Required</t-input-error>
</t-input-group>
```

<div class="demo-container">
  <t-input-group>
		<t-input-label>Name</t-input-label>
		<t-input></t-input>
		<t-input-error>Required</t-input-error>
	</t-input-group>
</div>

## Multiple groups

```javascript
<form>
	<t-input-group>
		<t-input-label>Name</t-input-label>
		<t-input></t-input>
	</t-input-group>
	<t-input-group>
		<t-input-label>Password</t-input-label>
		<t-input type="password"></t-input>
	</t-input-group>
</form>
```

<div class="demo-container">
  <form>
		<t-input-group>
			<t-input-label>Name</t-input-label>
			<t-input></t-input>
		</t-input-group>
		<t-input-group>
			<t-input-label>Password</t-input-label>
			<t-input type="password"></t-input>
		</t-input-group>
	</form>
</div>
