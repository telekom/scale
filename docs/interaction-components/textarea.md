# Textarea Interaction Tests

## Scope

The suite contains three `@interaction` cases in
`packages/visual-tests/src/textarea.interaction.spec.js`.

## Contract And Stories

- `components-text-area--standard` exposes a textbox named `Textarea` that
  accepts multiple lines of keyboard input.
- `components-text-area--max-length-with-counter` exposes a textbox named
  `Max Length With Counter`, with a maximum length of 10 and a visible count.
- `scale-textarea` emits `scale-change` with a `{ value }` detail when the
  value changes. Its native textarea enforces `maxLength`, and its counter
  renders the current value length and configured maximum.
- Story source:
  `packages/storybook-vue/stories/components/text-area/TextArea.stories.mdx`.
- Production source: `packages/components/src/components/textarea/textarea.tsx`.
- Fixture: `packages/visual-tests/src/test-fixtures.js` opens stories by ID
  and waits for custom elements to be ready.

## Test Cases And Prevented Regressions

- `textarea accepts multiline keyboard input and emits scale-change detail @interaction`:
  detects a broken accessible label, keyboard editing/newline behavior, value
  update, or public change-event payload.
- `textarea enforces max length and updates its counter and scale-change detail @interaction`:
  detects a missing native length limit, stale counter, or incorrect final
  change-event payload after typing beyond the limit.
- `textarea blocks editing while readonly or disabled and resumes after removal @interaction`:
  detects edits or `scale-input` events while either public attribute is active,
  and detects failure to resume editing and emit the final change after removal.

All tests use accessible role-and-name locators, real keyboard input, and
assertions on rendered values and public event details. They do not set the
component value, dispatch synthetic input events, use force clicks, or call
private component methods.

The existing core counterpart is `packages/components/src/components/textarea/textarea.e2e.ts`; it covers rendering and label-class behavior, while these browser cases cover editing, length enforcement, events, and runtime readonly/disabled transitions.

## Central Execution

Focused validation passed 8 executions across the two configured themes. The final full run passed 142 executions (71 checks in each theme), with no failures, skips, or flaky tests. Evidence: [component report](../../packages/visual-tests/interaction-results/components/textarea/report.json). See the [consolidated report](../interaction-tests-report.md).
