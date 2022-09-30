<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Text Field</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

A text field allows users to enter a single line of text.

## General

A text field is an input control for a single line of text. It can vary in width depending on which type of input you need.

### When to use

Use input fields when users should enter information like:

- email addresses,
- passwords,
- phone numbers,
- date, month, week, time, datetime-local
- or any other kind of information as free text.

### When not to use

Don't use a text field when users need to:

- search for something (here use the search component) or
- enter more than one line of input (use a text area instead).

## Elements

![Image Name](assets/3_components/text-input/input-field-elements.png)

### Label (1)

The label clearly indicates what information a user should enter, e.g., "Last name".

### Placeholder text (2) (Optional)

After a user clicks/taps the text area, the placeholder text offers a brief explanation of what to enter.

### Information (3) (Optional)

When necessary, you can also provide additional information to help users, such as "This information will remain anonymous".

### Character count (4) (Optional)

If the number of characters is limited, the counter shows the max number of characters and the current character count.

### Error (5)

If an error occurs, a corresponding text indicates what a user still needs to do, e.g., "Please enter your name". If the input field has an information text, the error text will temporarily take its place.

## Disabled state

If the text field is disabled, the user can't enter or change text. Use this state if a particular interaction is unavailable due to permissions or dependencies.

![Image Name](assets/3_components/text-input/input_disabled.png)

> The disabled state is exempt from the WCAG contrast minimum for text colors. You can find more information in the [WCAG guidelines](https://www.w3.org/TR/WCAG21/#contrast-minimum).

## Read only

Read-only text fields show prefilled text that users cannot edit or change. However, the content is accessible for screen readers. Use this state when you want users to read, but not edit, a particular piece of content.

![Image Name](assets/3_components/text-input/input_readonly.png)

## Best practices

- Declare text fields for specific data formats accordingly (e.g., for types like text, number, email, or password).

- Group text fields that are related to the same topic.

- Arrange input fields in a single-column layout to not disturb the user's editing flow. Exceptions are logically related fields like postal code and city.

- Mark mandatory inputs and reduce optional inputs as much as possible.

- Explain all input requirements, for example for passwords or credit card numbers.

## Related components

[Text Area](?path=/usage/components-text-area--standard)
