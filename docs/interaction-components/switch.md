# Switch Interaction Report

## Contract anchors

- `packages/components/src/components/switch/switch.tsx`: the native checkbox is labeled with `aria-labelledby`, reflects `checked` and `disabled`, and updates `checked` on change.
- The change handler emits `scale-change` with `{ value: this.checked }`.
- `packages/visual-tests/src/test-fixtures.js`: shared Playwright fixture, Storybook navigation, and exported `expect`.
- `packages/visual-tests/src/switch.visual.spec.js`: established story IDs, including `components-switch--standard` and `components-switch--standard-disabled`.

## Interaction tests

- `switch toggles in both pointer directions and emits scale-change values @interaction`: a user click turns the switch on and a second click turns it off; checks the accessible checkbox state and `scale-change` values `true` then `false`.
- `switch toggles with Space @interaction`: focuses the labeled checkbox and uses the Space key to turn it on.
- `disabled switch ignores pointer activation @interaction`: checks the disabled state, clicks its visible label, and confirms it remains off.

## Regression scope

The tests cover pointer transitions in both directions, the explicit change-event payload, Space activation, and blocked pointer activation when disabled. They do not test other keyboard keys, touch input, form submission, or disabled switches that start selected.

## Central Execution

Passed: 3 distinct checks in both Chromium themes (12 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/switch/report.json). See the [consolidated report](../interaction-tests-report.md).
