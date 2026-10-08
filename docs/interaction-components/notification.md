# Notification Interaction Coverage

## Contract And Source Anchors

- Standard story: `components-notification--standard`; its story args supply the opened, dismissible notification and the heading `Info notification with icon, title, copytext and close`.
- The component exposes the notification as an `alert` and its dismiss control as a button named `Close`.
- `scale-notification` emits `scale-before-close` with `trigger: "CLOSE_BUTTON"` on a close attempt, then emits `scale-close` after the notification closes. A notification without `delay` does not close automatically.

## Interaction Tests

| Test title                                                                      | Regression detected                                                                                                                                                           |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `notification dismisses with Enter and emits its close events @interaction`     | Detects a close button that cannot be reached and activated by keyboard, a notification that remains visible, or missing, duplicated, mis-sourced, or malformed close events. |
| `notification dismisses with a pointer and emits its close events @interaction` | Detects a close button that does not dismiss on pointer activation, a notification that remains visible, or missing, duplicated, mis-sourced, or malformed close events.      |

Both tests inspect events emitted by the production `scale-notification` element and assert the complete event sequence and close trigger. They also assert the accessible alert is initially visible and is hidden after dismissal.

## Scope And Validation

Only `packages/visual-tests/src/notification.interaction.spec.js` and this report are in scope. Production components, stories, the shared fixture, visual tests, and snapshots are unchanged.

## Central Execution

Passed: 2 distinct checks in both Chromium themes (8 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/notification/report.json). See the [consolidated report](../interaction-tests-report.md).
