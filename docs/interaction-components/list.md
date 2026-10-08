# List Interaction Coverage

## Contract

`scale-list` renders an ordered `<ol>` or unordered `<ul>`. It passes that
choice and each direct `scale-list-item`'s one-based index to the item. The
components render list structure and markers. They do not own activation,
selection, navigation, or keyboard interaction. Interaction coverage is N/A.

List items accept slotted content. Any control in that content keeps its own
interaction contract. This note does not assign nested control behavior to the
list.

## Story And Sources

- Stories: `components-list--ordered`, `components-list--unordered`, and
  `components-list--unordered-with-custom-icon`.
- Production sources: [list.tsx](../../packages/components/src/components/list/list.tsx)
  and [list-item.tsx](../../packages/components/src/components/list-item/list-item.tsx).
- Story source: [List.stories.mdx](../../packages/storybook-vue/stories/components/list/List.stories.mdx).

## Existing Coverage

- [list.visual.spec.js](../../packages/visual-tests/src/list.visual.spec.js)
  captures a default screenshot for each of the three stories.
- [list.spec.ts](../../packages/components/src/components/list/list.spec.ts)
  covers the snapshot, ordered CSS class, and ordered list-item rendering.
- [list.e2e.ts](../../packages/components/src/components/list/list.e2e.ts)
  checks that the component renders and hydrates.
- [list-item.spec.ts](../../packages/components/src/components/list-item/list-item.spec.ts)
  covers its snapshot; [list-item.e2e.ts](../../packages/components/src/components/list-item/list-item.e2e.ts)
  checks rendering and hydration.

These tests cover rendering, not list-owned interactions. No interaction test
is added because the list has no interaction behavior to exercise.

The component specs do not directly assert that `ordered` and the one-based
`index` reach every direct list item. This is a rendering/semantics gap, not an
interaction gap.

## Validation

## Central Execution

N/A: list and list-item render structure and markers but own no activation, selection, navigation, or keyboard interaction. The component index records zero executions and the reason in its [evidence report](../../packages/visual-tests/interaction-results/components/list/report.json). See the [consolidated report](../interaction-tests-report.md).
