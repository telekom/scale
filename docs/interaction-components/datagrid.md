# Data Grid Interaction Contract

## Contract

- Selecting a row checkbox updates the selected-row state and emits `scale-selection` with the selected row data.
- The Selection Export story consumes the public `selection` property when its export button is activated.
- A sortable column header accepts Enter. Sorting the Name column updates `aria-sort`, reorders the rendered rows, and emits `scale-sort` with the type, direction, column index, and sorted rows.

## Stories And Sources

- Selection story: `components-data-grid--selection-export` (`Selection Export`).
- Sort story: `components-data-grid--standard` (`Standard`).
- Production source: `packages/components/src/components/data-grid/data-grid.tsx` implements row selection, keyboard sorting, and both public events.
- Story fixtures: `packages/storybook-vue/stories/components/data-grid/DataGrid.stories.mdx` supplies both grids and their data.

## Interaction Tests

- `data grid selection updates rows and exports the public selection @interaction`
- `data grid sorts the Name column with Enter and emits sorted rows @interaction`

The selection row also contains a checkbox for its Toggle data cell. The selection test targets the dedicated `.tbody__cell--selection` cell so Playwright does not match both checkboxes.

The selection case sets public `fields` and `rows` for its scenario, then checks rendered selection, export feedback, and the `scale-selection` payload. The sorting case checks rendered order and `aria-sort` independently from the `scale-sort` payload. The existing core counterpart is `packages/components/src/components/data-grid/data-grid.spec.ts`; no private sizing or measurement guard is part of these browser assertions.

## Central Execution

Focused validation passed 4 executions across the two configured themes. The final full run passed 142 executions (71 checks in each theme), with no failures, skips, or flaky tests. Evidence: [component report](../../packages/visual-tests/interaction-results/components/datagrid/report.json). See the [consolidated report](../interaction-tests-report.md).
