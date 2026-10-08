# Dropdown Interaction Contract

## Contract

- The standard Storybook control exposes a labeled native combobox. From Category 3, ArrowUp selects Category 2; Home followed by End selects Category 3.
- ArrowUp updates the `scale-dropdown` host `value` and emits `scale-change` with a literal `{ value: "2" }` detail for Category 2.
- A disabled dropdown stays at its initial value when it receives keyboard input or a physical pointer click within the control bounds. It emits no `scale-change` event.

## Stories And Sources

- Standard story: `deprecated-components-dropdown--standard` (`label: "Select"`; options Category 1, Category 2, Category 3).
- Disabled story: `deprecated-components-dropdown--disabled` (`label: "Disabled"`, `disabled: true`).
- Production source: [dropdown.tsx](../../packages/components/src/components/dropdown/dropdown.tsx) renders the associated native select. `handleSelectChange` updates the host value and emits `scale-change` with the selected value; the native `disabled` property is applied to the select.
- Story source: [DropDown.stories.mdx](../../packages/storybook-vue/stories/components/dropdown/DropDown.stories.mdx) defines the exact story names, labels, and options.
- Existing visual coverage: [dropdown.visual.spec.js](../../packages/visual-tests/src/dropdown.visual.spec.js) opens the same standard and disabled story IDs.

## Interaction Tests

- `dropdown selects the previous option with ArrowUp @interaction` checks native selection, the production host value, and the literal `scale-change` detail. It detects a broken keyboard selection, host synchronization, or event payload.
- `dropdown selects the last option with End @interaction` checks selection of Category 3 through keyboard input and host value synchronization. It detects a broken end-of-options keyboard path.
- `disabled dropdown blocks keyboard and pointer selection @interaction` checks disabled semantics, unchanged selection after keyboard input and a physical click, and absence of `scale-change`. It detects disabled controls that accept either input path.

Coverage is limited to the standard and disabled stories. Controlled-mode behavior and repeated change events are not covered.

## Central Execution

Passed: 3 distinct checks in both Chromium themes (6 executions) in the final 142-execution full run, with no failures, skips, or flaky tests. Evidence: [component report](../../packages/visual-tests/interaction-results/components/dropdown/report.json). See the [consolidated report](../interaction-tests-report.md).
