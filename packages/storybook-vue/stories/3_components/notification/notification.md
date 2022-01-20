<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Notification</h1>
    <img src="assets/beta.png" alt="Beta Component" />
</div>

Notifications give users feedback about the status of the system or an action.

## General

Scale comes with toast, banner and inline notifications.

### When to use

Use notifications to

- inform users about the status of an action, or to
- provide a system message, or to
- communicate updates like "new message".

### When not to use

Don't use a notification for

- he user needs to confirm a decision to prevent or correct critical errors. In this case use a modal.

## Basic types

### Toast notification

Toast notifications appear immediately after a specific event. They do not refer to an object on the page and are temporarily displayed in a global position. Toast notifications can overlay content and are automatically hidden after a short time. Alternatively, they can be actively closed. If necessary, use a link to provide further information.

![Image Name](assets/3_components/notification/toast_notification.png)

### Banner notification

Banner notifications communicate system messages. They are displayed above the page content.

![Image Name](assets/3_components/notification/banner_notification.png)

### Inline notification

Inline notifications give users feedback on an action. They are located in the corresponding section of the page.

![Image Name](assets/3_components/notification/inline_notification.png)

## Variants

### Informational

The Informational Notification gives users additional and helpful information.

![Image Name](assets/3_components/notification/variant_info.png)

### Success

The sucess notification confirms a successfully performed action.

![Image Name](assets/3_components/notification/variant_success.png)

#### Warning

The Warning notification informs users about potentially unwanted results.

![Image Name](assets/3_components/notification/variant_warning.png)

#### Error

The error notification informs users about a failed action or error and may require an action to continue.

![Image Name](assets/3_components/notification/variant_error.png)

### Elements

![Image Name](assets/3_components/notification/elements.png)

#### Icon (1)

The icon illustrates the basic message of the notification.

#### Headline (2)

Formulate the text in a meaningful way and as short as possible.

#### Subheadline (3) (Optional)

A supporting text is only necessary in exceptional cases.

#### Link (4) (Optional)

Use the link within the toast or banner notification e.g. for further information.

#### Close-Icon (5) (Optional)

The close icon is optional.

## Positioning

### Toast notification

Toast notifications are usually placed on the top left or right and can obscure other content.

![Image Name](assets/3_components/notification/positioning_toast.png)

### Banner notification

Banner notifications are placed centered above the page content.

![Image Name](assets/3_components/notification/positioning_banner.png)

### Inline notification

Position inline notifications in the appropriate page area.

![Image Name](assets/3_components/notification/positioning_inline.png)

## Beta components

This component is still in the beta phase. When testing it, keep in mind that it may not have gone through all quality control measures, and it may not yet have WCAG accessibility certification. There may be changes to this component in the future.
