# Accordion Interaction Coverage

## Source and story contract

`packages/components/src/components/accordion/accordion.tsx` defines `dependent` as the mode where only one child can be open. When a child expands, the accordion closes other expanded children. The standard Storybook story starts with `dependent` and `expanded` set to false; the Dependent story sets `dependent` to true. Both stories use the same three heading labels and content.

`scale-collapsible` supplies the user-facing interaction: a native button named by its heading, `aria-expanded`, and a labelled `region` that is hidden while collapsed. Native button semantics support keyboard activation.

## Tests

- `standard accordion supports multiple open panels and collapse @interaction`: detects a standard accordion that fails to open a clicked panel, incorrectly closes an already-open sibling, or leaves a collapsed panel visible or marked expanded.
- `accordion buttons open and close panels with keyboard activation @interaction`: detects a heading button that cannot receive normal Tab focus, or fails to open with Space and close with Enter while keeping `aria-expanded` and panel visibility in sync.
- `dependent accordion applies single-open behavior to a live slotted panel @interaction`: detects dependent mode that leaves the previous panel open, fails to apply single-open behavior to a runtime-added child, or leaves a removed child exposed.

## Scope and validation

The dependent-mode case adds a `scale-collapsible` child at runtime, verifies that it closes the previous panel, then removes it and checks that its button and region leave the accessible tree. The existing core counterpart is `packages/components/src/components/accordion/accordion.e2e.ts`; this browser suite also covers the public Storybook behavior and live-child contract.

## Central Execution

Focused validation passed 6 executions across the two configured themes. The final full run passed 142 executions (71 checks in each theme), with no failures, skips, or flaky tests. Evidence: [component report](../../packages/visual-tests/interaction-results/components/accordion/report.json). See the [consolidated report](../interaction-tests-report.md).
