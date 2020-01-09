---
title: Alert
description: Alert element
url: /docs/alert
contributors:
  - eeegor
---

# Alert

Alert component

selector: `t-alert`

## Default

```javascript
<t-alert>
    This is only a warning - for your information!
</t-alert>
```

<div class="demo-container">
  <t-button id="show-alert-without-timeout">Show alert</t-button>
  <t-alert id="alert-without-timeout">
      This is only a warning - for your information!
  </t-alert>
  <script>
    const alertWithout = document.getElementById('alert-without-timeout');
    const showAlertWithout = document.getElementById('show-alert-without-timeout');
    showAlertWithout.addEventListener('click', () => !alertWithout.opened && alertWithout.open());
  </script>
</div>

## Opened

```javascript
<t-alert opened="true">
    This is only a warning - for your information!
</t-alert>
```

<div class="demo-container">
  <t-alert opened="true">
    This is only a warning - for your information!
</t-alert>
</div>

## Variants

Available `variants`:
- danger
- success
- warning
- info
- primary
- secondary

```javascript
<t-alert opened="true" variant="danger">
    This is only a warning - for your information!
</t-alert>
```

<div class="demo-container">
  <t-alert opened="true" variant="danger">
    This is only a warning - for your information!
  </t-alert>
</div>
