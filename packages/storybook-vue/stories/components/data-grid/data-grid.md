<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Data Grid</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Data grids help users collect and manage complex data.

## General

Data grids are an extended type of table. In addition to the standard functions of filtering and sorting, a data grid can include many other functions, such as selecting or deselecting all, showing and hiding, and exporting.

### When to use

Use data grids to:

- organize data so that users can easily understand, analyze, and compare it and
- provide additional functions so users can interact with the data.

### When not to use

Don't use data grids when:

- a table can't map the complexity of the individual data and functions or
- you don't need the additional functions.

## Row backgrounds

You can use alternating backgrounds to make the content more readable.

![Image Name](assets/3_components/data-grid/Backgrounds_en.png)

## Elements

With the data grid framework, you can freely combine a selection of existing components to account for a wide range of use cases.

![Image Name](assets/3_components/data-grid/elements-en.png)

#### Data grid heading (1)

A short headline describes the content in clear and simple terms.

#### Menu (2)

The menu includes functions such as sorting, selecting or deselecting all, showing and hiding, and exporting.

#### Numbering (3)

If you activate numbering, all lines are automatically numbered starting from 1.

#### Checkbox (4)

If you activate the checkbox, users can select some or all of the table data records for batch processing (e.g., archive, delete, mark as done).

#### Column headers (5)

The title in the column headers describes the content of the respective column.

#### Table row (6)

The content of a row forms a data unit and differs from the other rows both visually and in terms of content.
The row title contains a meaningful description of the data record.
The other rows can contain all kinds of content.
To aid readability, you can highlight the rows when hovering over them.

#### HTML slot (7)

If you fill in the HTML slot in a table row, it will add an expand icon at the end of the row. If users click on the expand icon, it will display the HTML content of this slot.

#### Pagination (8)

With the help of pagination, users can move through the entire data set in a deliberate way.

## Data components

You can use the following content components in the data grid:

![Image Name](assets/3_components/data-grid/Data_components_en.png)

## Mobile behavior

A row of data breaks to the next line on mobile screens and shows up as a separate item.

![Image Name](assets/3_components/data-grid/Mobile-en.png)

## Beta components

This component is still in the beta phase. When testing it, keep in mind that it might not have gone through all quality control checks, and it might not yet have WCAG accessibility certification. This component might change in the future.

## Related components

[Table](?path=/usage/components-table)
