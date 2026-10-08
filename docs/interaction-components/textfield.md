# TextField Interaction Tests

## Scope

This change adds three `@interaction` cases in
`packages/visual-tests/src/textfield.interaction.spec.js`. It changes only
that test file and this report. It does not change production code, shared
fixtures, stories, snapshots, or runner configuration.

## Contract And Stories

The tests use these existing Storybook stories:

- `components-text-field--standard`
- `components-text-field--max-length-with-counter`
- `components-text-field--read-only`
- `components-text-field--disabled`

The production `scale-text-field` component handles native input events. It
updates its value and emits `scale-change` with a `{ value }` detail. The
component applies `maxlength`, `readonly`, and `disabled` to its native input.
The counter renders the entered length and configured maximum. The component
has a password `type` option, but it has no clear button or password-visibility
toggle, so these tests do not claim such behavior.

## Test Cases And Prevented Regressions

- `textfield accepts keyboard input and emits scale-change detail`: detects a
  broken accessible label, keyboard editing, value update, or public change
  event payload.
- `textfield enforces max length and updates counter with scale-change detail`:
  detects a missing native length limit, stale counter, or incorrect final
  change payload after typing beyond the limit.
- `textfield readonly and disabled states prevent edits`: detects edits or
  change events that escape the readonly/disabled native input contract.

Each test runs in the configured light and dark projects. The tests use label
and role locators, real keyboard input, and assertions on the rendered value,
counter, native interaction state, and public event detail. They do not set the
component value, dispatch synthetic input events, use force clicks, or inspect
private component methods.

## Central Execution

Passed: 3 distinct checks in both Chromium themes (12 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/textfield/report.json). See the [consolidated report](../interaction-tests-report.md).
