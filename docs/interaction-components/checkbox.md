# Checkbox Interaction Contract

## Contract

- The visible label activates the associated native checkbox. A user click changes its checked state in both directions.
- Space changes the checked state of a focused, enabled checkbox.
- A disabled checkbox remains unchecked when its visible label is clicked.
- The component emits `scale-change` from the native input change handler. This suite does not assert the event payload.

## Stories And Sources

- Standard story: `components-checkbox--standard` (`label: "Checkbox"`).
- Disabled story: `components-checkbox--standard-disabled` (`label: "Standard Disabled", disabled: true`).
- Production source: `packages/components/src/components/checkbox/checkbox.tsx` renders a native checkbox input and an associated label. The `disabled` property is applied to the input.
- Existing component interaction example: `packages/visual-tests/src/components.interaction.spec.js`.

## Interaction Tests

- `checkbox toggles both ways from its label @interaction`
- `checkbox toggles with Space @interaction`
- `disabled checkbox ignores its label @interaction`

These checks guard against a broken label association, loss of keyboard toggling, or disabled controls changing state through label activation. Keyboard behavior is covered for the enabled control only. The disabled case covers label activation, not keyboard focus or key presses.

## Central Execution

Passed: 3 distinct checks in both Chromium themes (12 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/checkbox/report.json). See the [consolidated report](../interaction-tests-report.md).
