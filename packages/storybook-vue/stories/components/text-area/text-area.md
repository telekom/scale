<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Text Area</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

A text area allows users to enter one or multiple lines of text.

## General

The text area is an input control for multiple lines of text. It can vary in width and height depending on which type of input you need.

### When to use

Use a text area whenever users should be able to enter a longer piece of text. Typical use cases are comments or message fields.

### When not to use

If users don't need to enter multiple lines of text, use text fields instead.

## Elements

![Image Name](assets/3_components/text-area/text_area_elements.png)

#### Label (1)

The label clearly indicates what information a user should enter, e.g., "Your message".

#### Placeholder text (2) (Optional)

After a user clicks/taps the text area, the placeholder text offers a brief explanation of what to enter.

#### Information (3) (Optional)

When necessary, you can also provide additional information, such as "This information will remain anonymous".

#### Character count (4) (Optional)

If the number of characters is limited, the counter shows the max number of characters and the current character count.

#### Error (5)

If an error occurs, a corresponding text indicates what a user still needs to do, e.g., "Please fill out this field". If the input field has an information text, the error text will temporarily take its place.

#### Resize (6) (Optional)

Users can make the entire text visible with this resizing element.

## Scrolling

If the text is longer than the text area, the text area becomes scrollable. This even happens if the text area is resizable.

![Image Name](assets/3_components/text-area/text_area_scrolling.png)

## Disabled state

If the text area is disabled, users can't enter or change text. Use this state if a particular interaction is unavailable due to permissions or dependencies.

![Image Name](assets/3_components/text-area/text_area_disabled.png)

> The disabled state is exempt from the WCAG contrast minimum for text colors. You can find more information in the [WCAG guidelines](https://www.w3.org/TR/WCAG21/#contrast-minimum).

## Read only

Read-only text areas show prefilled text that users cannot edit or change. However, the content is accessible for screen readers. Use this state when you want users to read, but not edit, a specific piece of content.

![Image Name](assets/3_components/text-area/text_area_disabled_readonly.png)

## Related components

[Text Field](?path=/usage/components-text-field--standard)
