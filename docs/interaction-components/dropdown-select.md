# Dropdown Select Interaction Contract

## Contract

- ArrowDown opens the list; Home followed by ArrowDown makes Cedric active. Enter commits that option, updates the displayed value and host `value`, and emits `scale-change` with the literal value `cedric` in `event.detail.value`.
- If the `cedric` child option is disabled at runtime, keyboard navigation skips it and commits the next enabled option, updating the displayed and public `value` and emitting its literal value in `scale-change`.

## Stories And Sources

- Standard story: `components-dropdown-select--standard` (`value: "caspar"`; options Caspar, Cedric, Cem).
- Production source: `packages/components/src/components/dropdown-select/dropdown-select.tsx` handles keyboard actions, disabled state, and emits `scale-change` from option selection.
- Story event forwarding: `packages/storybook-vue/stories/components/dropdown-select/ScaleDropdownSelect.vue` forwards `scale-change` from the component.
- Existing core counterparts: `packages/components/src/components/dropdown-select/dropdown-select.e2e.ts` and `dropdown-select.spec.ts`.

## Interaction Tests

- `dropdown-select commits a keyboard selection and emits its value @interaction`
- `dropdown-select skips a child option disabled at runtime @interaction`

These checks cover keyboard commit and the public event value, plus live child-option disabling and navigation to the next enabled option. Escape cancellation, host-disabled pointer behavior, and typing/typeahead are not asserted by this suite.

## Central Execution

Passed: 2 distinct checks in both Chromium themes (4 executions) in the final 142-execution full run, with no failures, skips, or flaky tests. Evidence: [component report](../../packages/visual-tests/interaction-results/components/dropdown-select/report.json). See the [consolidated report](../interaction-tests-report.md).
