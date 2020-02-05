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
 <t-button id="show-modal">
      show modal
  </t-button>
    <t-modal id="modal" opened="false">
      <span slot="header">Header content</span> content in the modal slot
    </t-modal>
  <script>
      const showModal = document.querySelector('#show-modal');
      const modal = document.getElementById('modal');
      showModal.addEventListener('click', () => !modal.opened && modal.open());
  </script>
```

<div class="demo-container">
  <t-button id="show-defaultmodal">
      show modal
    </t-button>
 <t-modal id='modal-default' opened='false'>
 <span slot='header'>Header content</span> content in the modal slot
 </t-modal>
  <script>
      const showModalDefault = document.querySelector('#show-defaultmodal');
      const modalDefault = document.getElementById('modal-default');
      showModalDefault.addEventListener('click', () => !modalDefault.opened && modalDefault.open());
    </script>

</div>

## Modal without header

```javascript
  <t-button id="show-modal-without-header">
      show modal without header
    </t-button>
    <t-modal id="modal-without-header" opened="false">content</t-modal>
    <script>
      const showModalWithoutHeader = document.querySelector(
        '#show-modal-without-header'
      );
      const modalWithoutHeader = document.getElementById(
        'modal-without-header'
      );
      showModalWithoutHeader.addEventListener(
        'click',
        () => !modalWithoutHeader.opened && modalWithoutHeader.open()
      );
    </script>
```

<div class="demo-container">
  <t-button id="show-modal-without">
      show modal without header
    </t-button>
    <t-modal id="modal-without" opened="false">content</t-modal>
    <script>
      const showModalWithout = document.querySelector(
        '#show-modal-without'
      );
      const modalWithout = document.getElementById(
        'modal-without'
      );
      showModalWithout.addEventListener(
        'click',
        () => !modalWithout.opened && modalWithout.open()
      );
    </script>
</div>

## Modal with header and buttons

```javascript
<t-button id="show-modal-with-header-and-buttons">
      show modal with header and buttons
    </t-button>
    <t-modal id="modal-with-header-and-buttons" opened="false">
      <span slot="header">Header</span> content of the modal with header and
      buttons
      <span slot="close">Close</span>
      <span slot="modal-actions">
        <t-button id="cancel-btn">cancel</t-button>
        <t-button id="submit-btn">submit</t-button>
      </span>
    </t-modal>

    <script>
      const showModalWithHeaderAndButtons = document.querySelector(
        '#show-modal-with-header-and-buttons'
      );
      const modalWithHeaderAndButtons = document.getElementById(
        'modal-with-header-and-buttons'
      );
      const cancelModal = document.getElementById('cancel-btn');

      showModalWithHeaderAndButtons.addEventListener(
        'click',
        () =>
          !modalWithHeaderAndButtons.opened && modalWithHeaderAndButtons.open()
      );

      cancelModal.addEventListener('click', () =>
        modalWithHeaderAndButtons.close()
      );
    </script>
```

<div class="demo-container">
  <t-button id="show-modal-header-and-buttons">
      show modal with header and buttons
    </t-button>
    <t-modal id="modal-header-and-buttons" opened="false">
      <span slot="header">Header</span> content of the modal with header and
      buttons
      <span slot="close">Close</span>
      <span slot="modal-actions">
        <t-button id="cancel-button">cancel</t-button>
        <t-button id="submit-btn">submit</t-button>
      </span>
    </t-modal>
    <script>
      const showModalHeaderAndButtons = document.querySelector(
        '#show-modal-header-and-buttons'
      );
      const modalHeaderAndButtons = document.getElementById(
        'modal-header-and-buttons'
      );
      const cancelModalBtn = document.getElementById('cancel-button');
      showModalHeaderAndButtons.addEventListener(
        'click',
        () =>
          !modalHeaderAndButtons.opened && modalHeaderAndButtons.open()
      );
      cancelModalBtn.addEventListener('click', () =>
        modalHeaderAndButtons.close()
      );
    </script>
</div>
