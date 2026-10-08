# Textarea Interaction Tests

## Scope

This change adds two `@interaction` cases in
`packages/visual-tests/src/textarea.interaction.spec.js`. It changes only
that test file and this contract. It does not change production code, shared
fixtures, stories, snapshots, or runner configuration.

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

- `textarea accepts multiline keyboard input and emits scale-change detail`:
  detects a broken accessible label, keyboard editing/newline behavior, value
  update, or public change-event payload.
- `textarea enforces max length and updates its counter and scale-change detail`:
  detects a missing native length limit, stale counter, or incorrect final
  change-event payload after typing beyond the limit.

Both tests use accessible role-and-name locators, real keyboard input, and
assertions on rendered values and public event details. They do not set the
component value, dispatch synthetic input events, use force clicks, or call
private component methods.

## Central Execution

Passed: 2 distinct checks in both Chromium themes (8 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/textarea/report.json). See the [consolidated report](../interaction-tests-report.md).
