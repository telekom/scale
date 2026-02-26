<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Combobox</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

The combobox component combines the functionality of a text input field with a dropdown list, allowing users to either select a value from predefined options or enter a custom value.

## General

A combobox is a flexible input control that helps users find and select values efficiently. It displays a list of options that can be filtered by typing, reducing the number of options shown and helping users quickly locate their desired choice.

### When to use

Use a combobox when:

- You have a predefined set of options (5-20+ items)
- Users need to select from a list but may also want to enter custom values
- Screen space is limited and you want to avoid showing all options at once
- Users benefit from filtering options by typing to find their selection quickly

### When not to use

Don't use a combobox when:

- You have only 2-3 options (use radio buttons or a simple select instead)
- Custom values are not permitted and the list is very small
- Users need to see all options at once without scrolling (consider a button group or checkbox group)

## Variants

### Standard

The basic combobox with label and placeholder text. Users can select from the dropdown or type custom values.

### With Helper Text

Add helper text below the input to provide additional guidance or context about what value to enter.

### Invalid State

Display an error state when validation fails, with appropriate styling and helper text to guide the user.

### Required State

Add a required attribute to the input to indicate that the field must be filled out before form submission.

### Disabled Option

A disabled combobox is non-interactive. Use this when an option is not available due to permissions or dependencies.

### No Custom Values

Restrict the combobox to only allow selection from predefined options, preventing custom value entry.

## Features

- **Selection from predefined options**: Users can click or keyboard navigate through available options
- **Custom value support**: By default, users can type custom values not in the predefined list (configurable)
- **Keyboard navigation**: Full keyboard support with arrow keys, Enter, and Escape
- **Floating dropdown**: The options dropdown automatically positions itself to stay within the viewport using Floating UI
- **Helper text**: Optional text to guide users on how to use the combobox
- **Validation states**: Support for invalid/error states with visual feedback
- **Disabled state**: Full support for disabled inputs
- **Filtering**: Options are filtered in real-time as the user types
- **Accessible**: ARIA attributes and semantic HTML for screen reader support

## Keyboard Interactions

- **Arrow Up/Down**: Navigate through options when dropdown is open; open dropdown when closed
- **Enter**: Select the highlighted option
- **Escape**: Close dropdown without selecting
- **Tab**: Close dropdown and move focus to the next element
- **Backspace**: Delete characters from input

## Elements

### Label

The label communicates what value the combobox is for. It should be clear and concise.

### Input Field

The text input where users can type to filter options or enter custom values. It displays the currently selected value.

### Helper Text

Optional descriptive text below the input that provides context or validation messages.

### Dropdown List

The list of available options that appears below the input when focused. Options are filtered based on the user's input.

### Option Item

Individual selectable item in the dropdown list. Highlights when hovered or navigated with keyboard.

## Best Practices

### Clear Labels

Provide descriptive labels that clearly indicate what the user should select or enter.

### Helpful Placeholder Text

Use placeholder text to guide users on the expected input format or examples of valid values.

### Appropriate Option Lists

Keep option lists manageable (5-20 items). If you have many options, consider filtering or categorizing them.

### Error Messages

When validation fails, provide clear, actionable error messages in the helper text.

### Disabled Combobox

Only use the disabled state when an option is truly unavailable. Provide context about why it's disabled.

## Accessibility

The combobox component implements full ARIA support:

- Proper `role="combobox"` and `role="listbox"` attributes
- `aria-expanded` indicates dropdown state
- `aria-selected` indicates highlighted options
- `aria-controls` links the input to the listbox
- Screen reader announcements for option navigation and selection

## Related Components

[Text Field](?path=/usage/components-text-field--standard)
[Dropdown Select](?path=/usage/components-dropdown-select--standard)
[Menu Flyout](?path=/usage/components-menu-flyout--standard)
