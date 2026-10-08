# Radio Button Group Interaction Contract

## Contract

- Selecting an enabled option by its visible label checks it and unchecks every other option in the group.
- The group emits bubbling `scale-change` events when an option is selected. Each event detail contains the selected option value as a string.
- ArrowRight moves focus to the next native radio and selects it.
- A disabled radio remains unchecked when its visible label is clicked. Other options remain unchecked until the user selects one.

## Stories And Sources

- Standard story: `components-radio-button-group--standard` (`Group Label`, three `Radio Label` options with values `0`, `1`, and `2`).
- Disabled story: `components-radio-button-group--disabled` (the first option is disabled).
- Story source: `packages/storybook-vue/stories/components/radio-button-group/RadioButtonGroup.stories.mdx`.
- Group source: `packages/components/src/components/radio-button-group/radio-button-group.tsx` renders a labeled fieldset and the slotted options.
- Radio source: `packages/components/src/components/radio-button/radio-button.tsx` renders native radio inputs, clears checked sibling options, and emits `scale-change` with the selected value converted to a string.
- The Storybook template listens for `scale-change` on the group.

## Interaction Tests

- `radio button group selects one option and emits its value @interaction`: real label clicks check one option at a time and assert event values `1` and `2`.
- `radio button group navigates and selects with arrow keys @interaction`: ArrowRight moves focus from the first radio to the second and selects only the second.
- `disabled radio button ignores pointer activation @interaction`: a real pointer click at the disabled label's bounding box leaves every option unchecked.

## Regression Scope

These tests detect a broken label association, loss of exclusive selection, incorrect `scale-change` values, broken forward arrow navigation, or selection through a disabled option. They do not test ArrowLeft, wrapping at either end, form submission, or a disabled option that starts selected.

## Central Execution

Passed: 3 distinct checks in both Chromium themes (12 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/radio-button-group/report.json). See the [consolidated report](../interaction-tests-report.md).
