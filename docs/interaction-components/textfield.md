# TextField Interaction Tests

## Scope

The suite contains four `@interaction` cases in
`packages/visual-tests/src/textfield.interaction.spec.js`.

## Contract And Stories

The tests use these existing Storybook stories:

- `components-text-field--standard`
- `components-text-field--max-length-with-counter`

The production `scale-text-field` component handles native input events. It
updates its value and emits `scale-change` with a `{ value }` detail. The
component applies `maxlength`, `readonly`, and `disabled` to its native input.
The counter renders the entered length and configured maximum. The component
has a password `type` option, but it has no clear button or password-visibility
toggle, so these tests do not claim such behavior.

## Test Cases And Prevented Regressions

- `textfield accepts keyboard input and emits scale-change detail @interaction`: detects a
  broken accessible label, keyboard editing, value update, or public change
  event payload.
- `textfield enforces max length and updates counter with scale-change detail @interaction`:
  detects a missing native length limit, stale counter, or incorrect final
  change payload after typing beyond the limit.
- `textfield blocks editing while readonly or disabled and resumes after removal @interaction`:
  detects edits or `scale-input` events while either public attribute is active,
  and detects failure to resume editing and emit the final change after removal.
- `textfield validates email and submits its public name in a consumer form @interaction`:
  detects incorrect native email validity, an invalid form submission, or loss
  of the valid named value from `FormData`.

Each test runs in the configured light and dark projects. The tests use label
and role locators, real keyboard input, and assertions on the rendered value,
counter, native interaction state, public event detail, and consumer-form
validity/submission. They do not set the component value, dispatch synthetic
input events, use force clicks, or inspect private component methods.

The existing core counterpart is `packages/components/src/components/text-field/text-field.e2e.ts`; it covers component rendering, while these browser cases cover input, validation, event, and form contracts.

## Central Execution

Focused validation passed 4 executions across the two configured themes. The final full run passed 142 executions (71 checks in each theme), with no failures, skips, or flaky tests. Evidence: [component report](../../packages/visual-tests/interaction-results/components/textfield/report.json). See the [consolidated report](../interaction-tests-report.md).
