---
title: Modal
description: Modal element
url: /docs/modal
contributors:
  - SylviaGonschior
---

# Modal

Modal component

selector: `t-modal`

## Modal with header

```javascript
<t-modal id="modal-default" opened="false">
  <span slot="header">Header content</span> content in the modal slot
</t-modal>
```

<div class="demo-container">
  <t-button id="show-modal">
      show modal
  </t-button>
    <t-modal id="modal-default" opened="false">
      <span slot="header">Header content</span> content in the modal slot
    </t-modal>
  <script>
      const showModal = document.querySelector('#show-modal');
      const modal = document.getElementById('modal-default');
      showModal.addEventListener('click', () => !modal.opened && modal.open());
  </script>
</div>

## Modal without header

```javascript
<t-modal id="modal-without-header" opened="false">
  content
</t-modal>
```

<div class="demo-container">
    <t-modal id="modal-without-header" opened="false">content</t-modal>
</div>

## Modal with header and buttons

```javascript
<t-modal id="modal-with-header-and-buttons" opened="false">
  <span slot="header">Header</span> content of the modal with header and buttons
  <span slot="close">Close</span>
  <span slot="modal-actions">
    <t-button id="cancel-btn">cancel</t-button>
    <t-button id="submit-btn">submit</t-button>
  </span>
</t-modal>
```

<div class="demo-container">
    <t-modal id="modal-with-header-and-buttons" opened="false">
      <span slot="header">Header</span> content of the modal with header and
      buttons
      <span slot="close">Close</span>
      <span slot="modal-actions">
        <t-button id="cancel-btn">cancel</t-button>
        <t-button id="submit-btn">submit</t-button>
      </span>
    </t-modal>
</div>
