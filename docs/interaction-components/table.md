# Table Interaction Coverage

## Decision: N/A

`scale-table` is a presentation wrapper for a slotted native `<table>`. It applies table styles, striped-row styling, and optional sort-indicator icons. It does not sort rows, select rows, or own row actions. The sort handlers and keyboard bindings in [Table.stories.mdx](../../packages/storybook-vue/stories/components/table/Table.stories.mdx) belong to the Storybook template, not the component. Therefore, this component has no component-owned interaction to add to the `@interaction` suite.

Do not assert arbitrary slotted buttons as table behavior or duplicate the separate `scale-data-grid` interaction coverage.

## Supplied Visual Coverage

[table.visual.spec.js](../../packages/visual-tests/src/table.visual.spec.js) opens the supplied Storybook stories by their actual IDs:

- `components-table--standard`: default screenshot and hover screenshot for the third body row (`John` in the supplied `Jane`, `Jack`, `John` story data).
- `components-table--with-sorting-icons`: default screenshot of the sort indicators.
- `components-table--with-striped-rows`: default screenshot of striped styling.

This is four visual cases: three default captures and one row-hover capture. It covers presentation only; it does not verify sorting or keyboard behavior implemented by the Storybook template. No synthetic rows or arbitrary slotted controls are needed for component interaction coverage.

## Central Execution

N/A: `scale-table` is a styled wrapper; sorting and keyboard handlers belong to the Storybook template, not the component. The component index records zero executions and the reason in its [evidence report](../../packages/visual-tests/interaction-results/components/table/report.json). See the [consolidated report](../interaction-tests-report.md).
