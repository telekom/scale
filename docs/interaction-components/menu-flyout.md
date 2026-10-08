# Menu Flyout Interaction Coverage

## Contract and source anchors

- The Standard story is `components-flyout-menu--standard`. Its trigger is a `button` named `Open menu`; its menu items are `Menu Item 1`, `Menu Item 2`, and `Menu Item 3`.
- The Cascading Menu story is `components-flyout-menu--cascading-menu`. Its root items include `Item Title`, `Really Quite Long Item Title`, suffix items 1-3, and `Other Options`; suffix item 3 is disabled.
- `scale-menu-flyout-item` emits the public `scale-select` event for keyboard selection. The story also wires that event to its action panel.
- `menu-flyout-list.tsx` handles ArrowDown, Enter, and Escape. Escape closes the active menu. The current focus traversal includes disabled items, and root Escape does not restore focus to the trigger.

## Interaction Tests

| Test title                                                                                  | Regression detected                                                                                                                                                          |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `menu flyout opens, moves focus, and selects with the keyboard @interaction`                | Detects a trigger that does not open from Enter, incorrect initial or ArrowDown focus, failure to close after selection, or a missing/malformed public `scale-select` event. |
| `menu flyout dismisses with Escape without selecting and reopens from trigger @interaction` | Detects Escape that leaves the menu visible, emits `scale-select`, or prevents the real trigger from reopening the menu.                                                     |

Disabled-item traversal and trigger-focus restoration are known production gaps and are **NOT COVERED** by these tests. The prior speculative assertions failed in both themes; captured Playwright error contexts are [dark](../../packages/visual-tests/test-results/menu-flyout.interaction-me-4e0ff-s-trigger-focus-interaction-chromium-dark/error-context.md) and [light](../../packages/visual-tests/test-results/menu-flyout.interaction-me-4e0ff-s-trigger-focus-interaction-chromium-light/error-context.md). They show trigger focus was not restored and expected focus on `Other Options` was not reached after ArrowDown traversal.

## Scope and Validation

Only `packages/visual-tests/src/menu-flyout.interaction.spec.js` and this report are in scope. Production components, shared fixtures, existing visual tests, and snapshots are unchanged.

## Central Execution

Passed: 2 distinct checks in both Chromium themes (8 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/menu-flyout/report.json). See the [consolidated report](../interaction-tests-report.md).
