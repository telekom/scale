# Sidebar Navigation Interaction Coverage

## Source and story contract

The standard story, `components-sidebar-navigation--standard`, starts the `Reference` and `Function A` branches expanded. `Function A` contains the active `Endpoint 1` link. The collapsible renders its label as a link with `role="button"` and `aria-expanded`; pointer activation toggles the branch, and Space toggles it from the keyboard. Enter uses the link's normal keyboard activation. Collapsing hides the child list but does not clear the active link's `aria-current="page"`.

## Tests

| Test title                                                                           | Regression detected                                                                                                                                                   |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sidebar child branch toggles by pointer and preserves its active link @interaction` | Detects pointer activation that fails to collapse or reopen the branch, stale `aria-expanded` or child visibility, or loss of the active link's `aria-current` state. |
| `sidebar child branch toggles by keyboard with visible children @interaction`        | Detects loss of normal Tab focus order, Space collapse, Enter expansion, or synchronization between `aria-expanded` and child visibility.                             |

## Scope and validation

The change adds only `packages/visual-tests/src/sidebar-navigation.interaction.spec.js` and this report. It does not change production code, shared fixtures, visual snapshots, or test configuration.

## Central Execution

Passed: 2 distinct checks in both Chromium themes (8 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/sidebar-navigation/report.json). See the [consolidated report](../interaction-tests-report.md).
