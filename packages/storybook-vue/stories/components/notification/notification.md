<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Notification</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Notifications give users feedback about the status of the system or an action.

## General

Scale offers toast, banner, and inline notifications.

### When to use

Use notifications to:

- inform users about the status of an action,
- provide a system message, or
- communicate updates like "New Message".

### When not to use

Don't use a notification when:

- the user needs to confirm a decision to prevent or correct critical errors (here, use a modal instead).

## Basic types

### Toast notification

Toast notifications appear immediately after a specific event. They don’t refer to an object on the page and are temporarily displayed in a global position.
Toast notifications can cover other content and hide automatically after a short time. Alternatively, users can actively close them. If necessary, use a link to
provide further information.

![Image Name](assets/3_components/notifications/toast.png)

### Banner notification

Banner notifications communicate system messages. They are displayed above the page content.

![Image Name](assets/3_components/notifications/banner.png)

### Inline notification

Inline notifications give users feedback on an action. They are located in the corresponding section of the page.

![Image Name](assets/3_components/notifications/inline.png)

## Variants

### Informational notification

The informational notification gives users additional helpful information.

![Image Name](assets/3_components/notifications/variant_info.png)

### Success notification

The success notification confirms a successfully performed action.

![Image Name](assets/3_components/notifications/variant_success.png)

### Warning notification

The warning notification informs users about potentially unwanted results.

![Image Name](assets/3_components/notifications/variant_warning.png)

### Error notification

The error notification informs users about a failed action or error and may require an action to continue.

![Image Name](assets/3_components/notifications/variant_error.png)

## Elements

![Image Name](assets/3_components/notifications/elements.png)

### Icon (1)

The icon illustrates the basic message of the notification.

### Headline (2)

Formulate the text in a meaningful way and keep it as short as possible.

### Subheadline (3) (optional)

A supporting text is only necessary in exceptional cases.

### Link (4) (optional)

Use the link within the toast or banner notification (e.g., for further information).

### Close icon (5) (optional)

The close icon is optional.

## Positioning

### Toast notification

Toast notifications are usually placed on the top left or top right and can cover other content.

![Image Name](assets/3_components/notifications/position_toast.png)

### Banner notification

Center banner notifications above the page content.

![Image Name](assets/3_components/notifications/position_banner.png)

### Inline notification

Position inline notifications in the appropriate page area.

![Image Name](assets/3_components/notifications/position_inline.png)
