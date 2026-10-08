# Sidebar Navigation Interaction Coverage

## Source and story contract

The standard story, `components-sidebar-navigation--standard`, starts the `Reference` and `Function A` branches expanded. `Function A` contains the active `Endpoint 1` link. This interaction case changes that nested link and checks current-item state and real navigation.

The interaction test also checks pointer-driven branch state. It does not repeat keyboard navigation or the broader collapse/reopen checks; those remain in the visual suite.

## Tests

- `sidebar follows an updated nested link while preserving its current item @interaction`: detects loss of the active link's `aria-current` state, a stale nested child label or `href`, or failure to follow the new link through real navigation.

The case changes the nested link's label and `href` at runtime, then checks the public link, current-item state, and resulting URL. The existing core counterparts, `packages/components/src/components/sidebar-nav-item/sidebar-nav-item.e2e.ts` and `packages/components/src/components/sidebar-nav-collapsible/sidebar-nav-collapsible.e2e.ts`, cover component rendering; they do not replace this Storybook navigation assertion.

## Central Execution

Focused validation passed 6 executions across the two configured themes. The narrowed case passed five repeats in each theme (10 repeat executions total). The final full run passed 142 executions (71 checks in each theme), with no failures, skips, or flaky tests. Remote PR CI remains pending until the changes are pushed. Evidence: [component report](../../packages/visual-tests/interaction-results/components/sidebar-navigation/report.json). See the [consolidated report](../interaction-tests-report.md).
