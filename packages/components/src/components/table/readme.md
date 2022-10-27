# scale-table



<!-- Auto Generated Below -->


## Usage

### Table

### Default

<scale-table>
  <table>
    <thead>
    <tr>
      <th>Title</th>
      <th>Stats</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>Jane</td>
      <td>9.356</td>
    </tr>
    <tr>
      <td>Jack</td>
      <td>3.356</td>
    </tr>
    <tr>
      <td>John</td>
      <td>3.356</td>
    </tr>
    </tbody>
    <tfoot>
    <tr>
      <td>Total</td>
      <td>100.245,10</td>
    </tr>
    </tfoot>
  </table>
</scale-table>

### Small size

<scale-table size="small">
  <table>
    <thead>
    <tr>
      <th>Title</th>
      <th>Stats</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>Jane</td>
      <td>9.356</td>
    </tr>
    <tr>
      <td>Jack</td>
      <td>3.356</td>
    </tr>
    <tr>
      <td>John</td>
      <td>3.356</td>
    </tr>
    </tbody>
    <tfoot>
    <tr>
      <td>Total</td>
      <td>100.245,10</td>
    </tr>
    </tfoot>
  </table>
</scale-table>

### Full sorting example

<scale-table show-sort="true">
  <table id="sortable-table">
    <div style="padding: 20px 8px 0px 8px;">
      <scale-text size="h5">Table title</scale-text>
    </div>
    <thead>
    <tr>
      <!--  Pay attention to the usage of `th` `aria-sort` attribute-->
      <!--  which supports all the native values: `descending`, `ascending`, `none`, `other`.-->
      <th aria-sort="ascending" onclick="sortTable(this)">Title</th>
      <!--  When you want to disable sorting for a particular column,-->
      <!--  add the `aria-disabled` attribute to the `th`.-->
      <th aria-disabled="true" onclick="sortTable(this)">Tags</th>
      <th onclick="sortTable(this)">Stats</th>
      <th onclick="sortTable(this)" style="text-align: right;">Time</th>
      <th onclick="sortTable(this)" style="text-align: right;">
        Euros
      </th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>Jane</td>
      <td>
        <scale-tag size="small" style="margin-right: 8px"
        >Other</scale-tag
        >
        <scale-tag size="small" style="margin-right: 8px"
        >N/A</scale-tag
        >
        <scale-tag size="small">Demo</scale-tag>
      </td>
      <td>
        <div style="display: inline-flex; align-items: center;">
          <span style="margin-right: 8px">9.356</span>
          <scale-progress-bar
                  size="info"
                  style=" max-width: 120px;"
                  stroke-width="6"
                  percentage="90"
          />
        </div>
      </td>
      <td style="text-align: right; font-weight: 100;">00:00:20</td>
      <td style="text-align: right; font-weight: 100;">100.245,10</td>
    </tr>
    <tr>
      <td>Jack</td>
      <td>
        <scale-tag size="small" style="margin-right: 8px"
        >Other</scale-tag
        >
        <scale-tag size="small" style="margin-right: 8px"
        >N/A</scale-tag
        >
        <scale-tag size="small">Demo</scale-tag>
      </td>
      <td>
        <div style="display: inline-flex; align-items: center;">
          <span style="margin-right: 8px">3.356</span>
          <scale-progress-bar
                  size="info"
                  style=" max-width: 120px;"
                  stroke-width="6"
                  percentage="90"
          />
        </div>
      </td>
      <td style="text-align: right; font-weight: 100;">00:00:30</td>
      <td style="text-align: right; font-weight: 100;">100.345,10</td>
    </tr>
    <tr>
      <td>John</td>
      <td>
        <scale-tag size="small" style="margin-right: 8px"
        >Other</scale-tag
        >
        <scale-tag size="small" style="margin-right: 8px"
        >N/A</scale-tag
        >
        <scale-tag size="small">Demo</scale-tag>
      </td>
      <td>
        <div style="display: inline-flex; align-items: center;">
          <span style="margin-right: 8px">6.356</span>
          <scale-progress-bar
                  size="info"
                  style=" max-width: 120px;"
                  stroke-width="6"
                  percentage="90"
          />
        </div>
      </td>
      <td style="text-align: right; font-weight: 100;">00:00:40</td>
      <td style="text-align: right; font-weight: 100;">100.445,10</td>
    </tr>
    </tbody>
    <tfoot>
    <tr>
      <td>Total</td>
      <td />
      <td />
      <td style="text-align: right;">00:00:20</td>
      <td style="text-align: right;">100.245,10</td>
    </tr>
    </tfoot>
  </table>
  <script>
    function getNextSort(sort) {
      if (!sort || ["none", "other"].includes(sort)) {
        return "ascending";
      }
      if (sort === "ascending") {
        return "descending";
      }
      return "none";
    };
    
    function sortTable(th) {
      const currentSort = th.getAttribute("aria-sort");
      const nextSort = getNextSort(currentSort);
      const tableHeaders = Array.from(document.getElementsByTagName("TH"));
      const columnIndex = tableHeaders.findIndex((x) => x === th);
    
      // clean up previous aria-sort value
      tableHeaders.forEach((tableHeader) => {
        tableHeader.setAttribute("aria-sort", "none");
      });
    
      // set actual sort
      th.setAttribute("aria-sort", nextSort);
    
      // Taken from:
      // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sort_table
      var table, rows, switching, i, x, y, shouldSwitch;
      table = document.getElementById("sortable-table");
      switching = true;
      /*Make a loop that will continue until
        no switching has been done:*/
      while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
            first, which contains table headers):*/
        for (i = 1; i < rows.length - 1; i++) {
          //start by saying there should be no switching:
          shouldSwitch = false;
    
          /*Get the two elements you want to compare,
                one from current row and one from the next:*/
          x = rows[i].getElementsByTagName("TD")[columnIndex];
          y = rows[i + 1].getElementsByTagName("TD")[columnIndex];
    
          if (
            !["descending", "ascending"].includes(nextSort) ||
            x.parentElement.parentElement.tagName === "TFOOT" ||
            y.parentElement.parentElement.tagName === "TFOOT"
          ) {
            break;
          }
    
          //check if the two rows should switch place:
          if (
            (nextSort === "ascending" ? y : x).innerHTML.toLowerCase() >
            (nextSort === "ascending" ? x : y).innerHTML.toLowerCase()
          ) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
        if (shouldSwitch) {
          /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
      }
    }
  </script>
</scale-table>



## Properties

| Property   | Attribute   | Description                                                                                   | Type      | Default     |
| ---------- | ----------- | --------------------------------------------------------------------------------------------- | --------- | ----------- |
| `showSort` | `show-sort` | (optional) Display sort arrows on/off                                                         | `boolean` | `false`     |
| `size`     | `size`      | <span style="color:red">**[DEPRECATED]**</span> - css overwrite should replace size<br/><br/> | `string`  | `undefined` |
| `striped`  | `striped`   | (optional) Striped Table                                                                      | `boolean` | `false`     |
| `styles`   | `styles`    | (optional) Injected CSS styles                                                                | `string`  | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
