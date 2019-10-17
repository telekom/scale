---
layout: default
title: Alert
---

# Alert

An Alert component

selector: `t-alert`

## Default

<div class="demo-container">
	<t-alert id="alert-without-timeout" opened="true">
		This is only a warning - for your information!
	</t-alert>
</div>

```html
<t-alert>
    This is only a warning - for your information!
</t-alert>
```

## With Headline

<div class="demo-container">
	<t-alert headline="Help!" opened="true">
			This is only a warning - for your information!
	</t-alert>
</div>

```html
<t-alert headline="Help!">
    This is only a warning - for your information!
</t-alert>
```

## Variants

### Danger

<div class="demo-container">
	<t-alert variant="danger" opened="true">
			This is only a warning - for your information!
	</t-alert>
</div>

```html
<t-alert variant="danger">
    This is only a warning - for your information!
</t-alert>
```

### Success

<div class="demo-container">
	<t-alert variant="success" opened="true">
			This is only a warning - for your information!
	</t-alert>
</div>

```html
<t-alert variant="success">
    This is only a warning - for your information!
</t-alert>
```

## With Default Timeout

<div class="demo-container">
	<t-button id="show-alert-btn-with-default-timeout">
		show alert with default timeout
	</t-button>
	<t-alert id="alert-with-default-timeout" timeout="true">
		This is only a warning - for your information!
	</t-alert>
</div>

<script>
	const showAlert = document.querySelector(
		"#show-alert-btn-with-default-timeout"
	);
	const alert = document.getElementById("alert-with-default-timeout");
	showAlert.addEventListener("click", () => !alert.opened && alert.open());
</script>

```html
<t-alert timeout="true">
    This is only a warning - for your information!
</t-alert>
```

## With Custom Timeout

<div class="demo-container">
	<t-button id="show-alert-btn-with-custom-timeout">
		show alert with custom timeout
	</t-button>
	<t-alert id="alert-with-custom-timeout" timeout="500">
		This is only a warning - for your information!
	</t-alert>
</div>

<script>
	const showAlertWithCustom = document.querySelector(
		"#show-alert-btn-with-custom-timeout"
	);
	const alertWithCustom = document.getElementById(
		"alert-with-custom-timeout"
	);
	showAlertWithCustom.addEventListener(
		"click",
		() => !alertWithCustom.opened && alertWithCustom.open()
	);
</script>

```html
<t-alert timeout="500">
    This is only a warning - for your information!
</t-alert>
```
```javascript
const showAlertWithCustom = document.querySelector("#show-alert-btn-with-custom-timeout");
const alertWithCustom = document.getElementById("alert-with-custom-timeout");

showAlertWithCustom.addEventListener("click", () => !alertWithCustom.opened && alertWithCustom.open());
```
