# Notification Badge Interaction Coverage

## Contract And Source Anchors

- `scale-notification-badge` accepts `label`, `maxCharacters` (default `3`), and `type` (`icon`, `text`, or `nav-icon`; default `icon`). It renders the label and slotted content as a badge.
- For `icon` and `text`, the component wraps the badge in a focusable `div` and assigns the optional `clickHandler` to that wrapper's click event. For `nav-icon`, it renders the badge without that wrapper or callback.
- The wrapper has focus styling, but the component has no keyboard activation handler. A focusable `div` does not establish Enter or Space activation as supported behavior.
- The supplied Storybook stories are Standard, Icon, Text, Label icon, and Label text. Text and Label text forward the optional `clickHandler` argument, but no supplied story configures a callback. Icon-based stories do not forward it.

## Current Visual Coverage

`packages/visual-tests/src/notification-badge.visual.spec.js` captures these five stories: `standard`, `icon`, `text`, `label-icon`, and `label-text`. These are presentation checks, not interaction checks.

## Interaction Tests

Two tests configure the public callback before real pointer input. The text-mode test requires exactly one trusted click to reach that callback. The nav-icon test requires no callback because its surrounding control owns activation. These tests detect missing callback wiring and accidental callback wiring in nav-icon mode; they do not assert a test-owned DOM click marker.

## Gaps And Validation

- The callback is configured through the public property because the supplied stories do not install one.
- Keyboard activation is not implemented by the component and is not asserted as supported behavior.
- Production code, stories, visual specs, and snapshots are unchanged.

## Central Execution

Passed: 2 distinct checks in both Chromium themes (8 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/notification-badge/report.json). Keyboard activation is not implemented or asserted. See the [consolidated report](../interaction-tests-report.md).
