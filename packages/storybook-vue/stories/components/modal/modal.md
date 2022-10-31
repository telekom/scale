<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Modal</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Modal dialogs require immediate attention and interrupt the user's workflow. They appear whenever the user needs information or has to make a decision to complete a task.

## General

A modal dialog appears as an overlay. The main content of the page is disabled until the user interacts with the modal.

### When to use

Use a modal if:

- you need to provide warnings and urgent information about the user's current task (e.g., system errors or the consequence of a user's action),
- the system requires critical information from the user to execute the current process,
- particular information from the user would make a process easier for them to continue, or
- the user needs to confirm a decision to prevent or correct critical errors.

### When not to use

Don't use a modal for:

- information or actions that are not related to the current user flow (this might prevent users from completing their task) or
- complex decision making that requires information the modal doesn't provide (this might force users to switch between the modal and main page, which would critically affect the user experience).

## Elements

![Image Name](assets/3_components/modal/Modal_Basic.png)

### Title (1)

A title is mandatory and should be short and concise.

### Content (2)

Different kinds of content are possible. Once the modal reaches its maximum display height, the content starts scrolling.

#### Action area (3)

The action area can contain one primary button and up to two secondary buttons. The primary button should represent a positive action (confirm, save); the secondary buttons represent negative or less important actions (delete, cancel).

### Close Icon (4)

The close icon is mandatory.

## Scrolling

If the content exceeds the space provided by the modal, the content becomes scrollable.
To frame the scrollable area, an overlay highlights the action bar. A divider appears below the header.

![Image Name](assets/3_components/modal/Modal_Scrolling.png)

## Sizes

### Desktop

For desktops, modals come in sizes S, L, or XL and span 6, 8, or 12 columns, respectively. Select the modal size that best fits the amount of content for your use case.

![Image Name](assets/3_components/modal/desktop_12columns.png)
![Image Name](assets/3_components/modal/desktop_8columns.png)
![Image Name](assets/3_components/modal/desktop_6columns.png)

### Mobile

On mobile, all modals have the same size: full width (4 columns).

![Image Name](assets/3_components/modal/mobile_4columns.png)

## Best practices

- Clearly describe the confirmed action and explain the potential consequences.
- Both title and button should indicate which action will occur.
- Never use a primary button if the action is destructive or irreversible.
