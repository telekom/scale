# Accordion Interaction Coverage

## Source and story contract

`packages/components/src/components/accordion/accordion.tsx` defines `dependent` as the mode where only one child can be open. When a child expands, the accordion closes other expanded children. The standard Storybook story starts with `dependent` and `expanded` set to false; the Dependent story sets `dependent` to true. Both stories use the same three heading labels and content.

`scale-collapsible` supplies the user-facing interaction: a native button named by its heading, `aria-expanded`, and a labelled `region` that is hidden while collapsed. Native button semantics support keyboard activation.

## Tests

| Test title                                                                      | Regression detected                                                                                                                                                         |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `standard accordion supports multiple open panels and collapse @interaction`    | Detects a standard accordion that fails to open a clicked panel, incorrectly closes an already-open sibling, or leaves a collapsed panel visible or marked expanded.        |
| `accordion buttons open and close panels with keyboard activation @interaction` | Detects a heading button that cannot receive normal Tab focus, or fails to open with Space and close with Enter while keeping `aria-expanded` and panel visibility in sync. |
| `dependent accordion keeps only the newly selected panel open @interaction`     | Detects dependent mode that leaves the previous panel open, or fails to expose the newly selected panel as expanded and visible.                                            |

## Scope and validation

The change adds only `packages/visual-tests/src/accordion.interaction.spec.js` and this report. It does not change production code, shared fixtures, visual snapshots, or test configuration.

## Central Execution

Passed: 3 distinct checks in both Chromium themes (12 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/accordion/report.json). See the [consolidated report](../interaction-tests-report.md).
