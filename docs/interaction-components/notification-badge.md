# Notification Badge Interaction Coverage

## Contract And Source Anchors

- `scale-notification-badge` accepts `label`, `maxCharacters` (default `3`), and `type` (`icon`, `text`, or `nav-icon`; default `icon`). It renders the label and slotted content as a badge.
- For `icon` and `text`, the component wraps the badge in a focusable `div` and assigns the optional `clickHandler` to that wrapper's click event. For `nav-icon`, it renders the badge without that wrapper or callback.
- Keyboard activation is outside the interaction assertions; this guide makes no keyboard-support or known-bug claim.
- The supplied Storybook stories are Standard, Icon, Text, Label icon, and Label text. Text and Label text forward the optional `clickHandler` argument, but no supplied story configures a callback. Icon-based stories do not forward it.

## Current Visual Coverage

`packages/visual-tests/src/notification-badge.visual.spec.js` captures these five stories: `standard`, `icon`, `text`, `label-icon`, and `label-text`. These are presentation checks, not interaction checks.

## Interaction Tests

The two exact test titles are:

- `notification badge preserves its callback after type and slotted action changes @interaction`
- `nav-icon badge leaves click handling to its surrounding control @interaction`

The first test changes public `type` and `label` attributes, waits for the rendered label as the readiness signal, replaces slotted content with a real button, and verifies the public callback receives one trusted click. The second places the nav-icon badge inside its owning button and verifies that the owner receives the trusted click while the badge callback remains unused. The callback is observed directly; the tests do not add a test-owned click listener or marker to stand in for the component behavior. The visual counterpart is `packages/visual-tests/src/notification-badge.visual.spec.js`; its screenshots do not cover this callback contract.

## Validation

- The callback is configured through the public property because the supplied stories do not install one.
- These checks assert pointer callback ownership; they do not make a keyboard-activation claim.

## Central Execution

Focused validation passed 2 executions across the two configured themes. The final repeated run passed 20 executions: five repeats of both cases in each theme. The final full run passed 142 executions (71 checks in each theme), with no failures, skips, or flaky tests. Evidence: [component report](../../packages/visual-tests/interaction-results/components/notification-badge/report.json). See the [consolidated report](../interaction-tests-report.md).
