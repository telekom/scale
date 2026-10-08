# Segmented Button Interactions

The interaction suite contains one test:

- `enabling a slotted segment lets it select and emit its detail @interaction` opens the standard story, toggles the Samsung segment's public `disabled` property, then clicks it. The test checks enabled state, selected properties for Samsung and Apple, and the full `scale-change` detail for all four live slotted segments.

The test uses the rendered native button and public segment properties. It does not clone or remount the component, call private handlers, or set selection directly. The existing core counterpart is `packages/components/src/components/segmented-button/segmented-button.spec.ts`.

## Central Execution

Focused validation passed 2 executions across the two configured themes. The final full run passed 142 executions (71 checks in each theme), with no failures, skips, or flaky tests. Evidence: [component report](../../packages/visual-tests/interaction-results/components/segmented-button/report.json). See the [consolidated report](../interaction-tests-report.md).
