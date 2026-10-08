# Chip Interaction Contract

## Contract

- A persistent chip exposes its slotted label as a switch. Pointer click and Space toggle `aria-checked` and emit one bubbling `scale-change` event from `scale-chip`. Its detail is the triggering click or keydown event; Space reports `code: "Space"`.
- A selected dynamic chip exposes a button named by `dismissText` (the default is `dismiss`). Clicking it emits one bubbling `scale-close` event from `scale-chip`, with the triggering click event as its detail. The component does not remove itself; a consumer decides what to do with the event.

## Stories And Sources

- Persistent selection story: `components-chip--persistent-standard` (`label: "Label"`).
- Selected dynamic dismissal story: `components-chip--dynamic-selection-standard` (`label: "Label"`, `selected: true`).
- Story definitions and the separate parent-managed interactive example: `packages/storybook-vue/stories/components/chip/Chip.stories.mdx`.
- Production source: `packages/components/src/components/chip/chip.tsx`.

## Interaction Tests

- `persistent chip toggles with pointer and Space and emits scale-change @interaction`
- `selected dynamic chip dismiss button emits scale-close without removing the chip @interaction`

These tests check the accessible switch state, the dismiss button, event name, bubbling, target, actual input-event detail, and exact event count. The dismiss test uses the static selected story, not the parent-managed interactive example, so it asserts the host remains visible after `scale-close`.

## Scope And Validation

Only the chip interaction spec and this contract note are in scope.

## Central Execution

Passed: 2 distinct checks in both Chromium themes (8 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/chip/report.json). See the [consolidated report](../interaction-tests-report.md).
