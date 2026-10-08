# Toggle Group Interaction Contract

## Status

Toggle Group is deprecated. The Storybook story is under `Deprecated
Components/Toggle Group`, and the component history says Segmented Button
replaces it. Treat the behavior below as a record of the existing implementation,
not as a supported contract for new work. Use Segmented Button for new
implementations.

## Existing Behavior

- The group renders a `role="group"` with an accessible label. By default, the
  label reports the number of slotted toggle buttons.
- Each `scale-toggle-button` is a native button with `aria-pressed`. A user
  activation toggles that button and emits bubbling `scale-click` with its ID
  and selected state.
- The group listens for `scale-click`. With `single-select` off, it updates the
  activated button and keeps other selections. With `single-select` on,
  activating an unselected button clears the other selections; activating the
  selected button can clear the selection.
- The group emits `scale-change` with the full ordered list of button IDs and
  selected states after it handles an activation.
- The group propagates its size, background, disabled, border, and variant
  properties to its buttons. It assigns corner positions from child order.
- The buttons use native button keyboard activation and focus behavior. The
  inspected group implementation does not add arrow-key navigation or
  roving-focus behavior.

## Coverage

The component unit tests cover initial snapshots and call the group handler
directly to check multi-select and single-select state changes. They do not
exercise a real user activation or assert the browser event payload.

The only matching visual suite is
`packages/visual-tests/src/toggle-group.visual.spec.js`. Its enclosing suite
uses `test.describe.skip`; it has 12 declared cases for deprecated stories and
states. Do not remove that exclusion or treat those screenshots as active
interaction coverage. There is no interaction spec for Toggle Group.

The active Segmented Button Storybook entry and visual spec provide replacement
coverage for standard, icon-only and icon-with-text rendering; single- and
multi-selection by pointer and keyboard; disabled controls; and invalid state.
The suite has seven test cases in its source and 14 active cases in the visual
coverage inventory. This coverage tests Segmented Button, not Toggle Group. It
does not establish one-to-one parity for Toggle Group properties or its
`scale-click` / `scale-change` payloads.

## Sources

- `packages/components/src/components/toggle-group/toggle-group.tsx` defines
  the current group behavior and events.
- `packages/components/src/components/toggle-button/toggle-button.tsx` defines
  button activation, `aria-pressed`, and `scale-click`.
- `packages/components/src/components/toggle-group/toggle-group.spec.ts` covers
  snapshots and direct handler state transitions.
- `packages/storybook-vue/stories/deprecated/toggle-group/ToggleGroup.stories.mdx`
  contains the deprecated story contract.
- `packages/storybook-vue/stories/update_history/Design_en.md` records that
  Segmented Button replaces Toggle Group.
- `packages/visual-tests/src/segmented-button.visual.spec.js` covers the active
  replacement interactions.

## Validation

No Toggle Group interaction test was added because its story is deprecated and
its visual suite is explicitly skipped.

## Central Execution

N/A: deprecated component with no active interaction spec; its legacy visual suite remains explicitly skipped. The component index records zero executions and the reason in its [evidence report](../../packages/visual-tests/interaction-results/components/toggle-group/report.json). See the [consolidated report](../interaction-tests-report.md).
