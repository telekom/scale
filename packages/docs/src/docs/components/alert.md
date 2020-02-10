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
 <t-button id="show-alert-btn"
      >show alert
    </t-button>
    <t-alert id="alert" variant="danger" title="Help!" icon="!">
      This is only a warning - for your information!
      <div slot="close">Close</div>
    </t-alert>
    <script>
      const showAlert = document.querySelector(
        '#show-alert-btn'
      );
      const alert = document.getElementById('alert');
      showAlert.addEventListener(
        'click',
        () => !alert.opened && alert.open()
      );
    </script>
```

<div class="demo-container">
 <t-button id="show-alert-btn-without-timeout"
      >show alert
    </t-button>
    <t-alert id="alert-without-timeout" variant="danger" title="Help!" icon="!">
      This is only a warning - for your information!
      <div slot="close">Close</div>
    </t-alert>
    <script>
      const showAlertWithout = document.querySelector(
        '#show-alert-btn-without-timeout'
      );
      const alertWithout = document.getElementById('alert-without-timeout');
      showAlertWithout.addEventListener(
        'click',
        () => !alertWithout.opened && alertWithout.open()
      );
    </script>
</div>

## Opened

```javascript
<t-alert opened="true">This is only a warning - for your information!</t-alert>
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
