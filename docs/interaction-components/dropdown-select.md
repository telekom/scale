# Dropdown Select Interaction Contract

## Contract

- ArrowDown opens the list; Home followed by ArrowDown makes Cedric active. Enter commits that option, updates the displayed value and host `value`, and emits `scale-change` with the literal value `cedric` in `event.detail.value`.
- Escape closes the list without committing the active option. The displayed and public `value` remain unchanged.
- A disabled dropdown does not open after a real pointer click.

## Stories And Sources

- Standard story: `components-dropdown-select--standard` (`value: "caspar"`; options Caspar, Cedric, Cem).
- Disabled story: `components-dropdown-select--disabled` (`disabled: true`).
- Production source: `packages/components/src/components/dropdown-select/dropdown-select.tsx` handles keyboard actions, disabled state, and emits `scale-change` from option selection.
- Story event forwarding: `packages/storybook-vue/stories/components/dropdown-select/ScaleDropdownSelect.vue` forwards `scale-change` from the component.
- Existing component behavior tests: `packages/components/src/components/dropdown-select/dropdown-select.e2e.ts` and `dropdown-select.spec.ts`.

## Interaction Tests

- `dropdown-select commits a keyboard selection and emits its value @interaction`
- `dropdown-select Escape cancels navigation and preserves selection @interaction`
- `disabled dropdown-select ignores a real pointer click @interaction`

These checks cover keyboard commit and the public event value, cancellation without selection loss, and pointer blocking for the disabled control. They do not cover typing/typeahead or disabled individual options.

## Central Execution

Passed: 3 distinct checks in both Chromium themes (12 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/dropdown-select/report.json). See the [consolidated report](../interaction-tests-report.md).
