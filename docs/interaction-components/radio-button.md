# Radio Button Interaction Contract

## Contract

- Clicking a radio's visible label selects that option and clears the selected state from its same-name siblings.
- Space selects a focused radio. ArrowDown moves selection to the next radio in the group.
- A selection updates the `scale-radio-button` host's public `checked` property and emits `scale-change` with the selected string value.
- A disabled radio remains unchecked and emits no `scale-change` when its visible label receives a physical pointer click.

## Stories And Sources

- Standard story: `components-radio-button-group--standard`; it renders three unchecked radios labeled `Radio Label`, with values `0`, `1`, and `2`.
- Disabled story: `components-radio-button-group--disabled`; its first radio is disabled.
- Production source: `packages/components/src/components/radio-button/radio-button.tsx` renders a native radio and associated label. Its change handler updates host `checked`, clears same-name siblings, and emits `scale-change` with `{ value }`.
- Component tests: `packages/components/src/components/radio-button/radio-button.spec.ts` cover checked updates and change emission.
- Visual setup: `packages/visual-tests/src/radio-button.visual.spec.js` mounts the radio component using the radio-button-group standard story as the Storybook host. Interaction tests use that real story directly.
- Shared fixture: `packages/visual-tests/src/test-fixtures.js` provides Storybook navigation and Playwright `expect`.

## Interaction Tests

- `radio label selects one option and emits its value @interaction`
- `radio selection moves with arrow keys and emits the selected value @interaction`
- `disabled radio ignores a physical label click @interaction`

The tests assert both native radio state and the component host's public `checked` state. Event payload checks use literal string values, so native browser selection alone cannot pass if the component handler stops synchronizing its host or emitting the public event.

## Central Execution

Passed: 3 distinct checks in both Chromium themes (12 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/radio-button/report.json). See the [consolidated report](../interaction-tests-report.md).
