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

The selection row also contains a checkbox for its Toggle data cell. The selection test targets the dedicated `.tbody__cell--selection` cell so Playwright does not match both checkboxes. The saved light- and dark-theme failures were strict-mode errors at the initial unchecked-state assertion, before any click or event assertion; they do not show a product behavior failure.

These checks validate visible state independently from the corresponding public event payload. Both wait for the temporary auto-width table to be removed before interacting with the rendered grid.

## Central Execution

Passed: 2 distinct checks in both Chromium themes (8 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/datagrid/report.json). See the [consolidated report](../interaction-tests-report.md).
