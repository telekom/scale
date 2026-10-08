# Tooltip Interaction Coverage

## Source and story contract

The component contract is in [tooltip.tsx](../../packages/components/src/components/tooltip/tooltip.tsx). The `hover focus` default trigger opens on pointer hover or focus; leaving the trigger or blurring it closes the tooltip. Escape is handled on the component host while the tooltip is open. The accessible tooltip uses `role="tooltip"` and reflects its state through `aria-hidden`.

The visual test fixture in [test-fixtures.js](../../packages/visual-tests/src/test-fixtures.js) opens real Storybook stories and waits for components to be ready. The tests use `components-tooltip--standard` with the button named `Hover me`, and `components-tooltip--trigger` with the focus-only button named `Focus me`.

## Tests

| Test title                                                               | Regression detected                                                                                                                                             |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tooltip opens on hover and closes when the pointer leaves @interaction` | Detects a broken hover-to-open path, missing accessible tooltip content, or a tooltip that remains exposed after mouseout.                                      |
| `keyboard focus opens tooltip; blur and Escape close it @interaction`    | Detects a focus trigger that fails under Tab navigation, a tooltip that remains exposed after keyboard blur, or a failure to close an open tooltip with Escape. |

The hover test changes the public `content` property after opening the story and checks the updated accessible tooltip text. The existing core counterpart is `packages/components/src/components/tooltip/tooltip.e2e.ts`.

## Scope and validation

The change adds only `packages/visual-tests/src/tooltip.interaction.spec.js` and this report. It does not change production code, shared fixtures, visual snapshots, or test configuration.

## Central Execution

Focused validation passed 4 executions across the two configured themes. The final full run passed 142 executions (71 checks in each theme), with no failures, skips, or flaky tests. Evidence: [component report](../../packages/visual-tests/interaction-results/components/tooltip/report.json). See the [consolidated report](../interaction-tests-report.md).
