import React from "react"
import {
  ScaleButton,
  ScaleCard,
  ScaleLink,
  ScaleTag,
  ScaleTable,
  ScaleInput,
  ScaleText
} from "@scaleds/components-react"
import { Link } from "gatsby"
import { useTable, useSortBy } from "react-table"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const columns = React.useMemo(
    () => [
      {
        id: "x01337",
        Header: "First Name",
        accessor: "firstName"
      },
      {
        id: "x01338",
        Header: "Last Name",
        accessor: "lastName"
      }
    ],
    []
  )

  const data = React.useMemo(() => [{ firstName: "John", lastName: "Doe" }], [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  )

  return (
    <Layout>
      <SEO title="Home" />
      <Link to="/404">404</Link>
      <Link to="/">Home</Link>

      <h3>Alert</h3>
      <ScaleLink href="http://example.com" target="_blank" variant="success">
        Success
      </ScaleLink>
      <h3>Button</h3>
      <ScaleButton variant="primary">Click!</ScaleButton>
      <h3>Card</h3>
      <ScaleCard>A title</ScaleCard>
      <h3>Tag</h3>
      <ScaleTag dismissable size="small" onClose={event => console.log(event)}>
        A title
      </ScaleTag>
      <h3>Input</h3>
      <ScaleInput styles={{ input: { "& input": { color: "blue" } } }} />
      <h3>Table</h3>
      <ScaleTable variant="regular">
        <div slot="header" style={{ padding: "20px 8px 0px 8px" }}>
          <ScaleText variant="h5">Table title</ScaleText>
        </div>
        <table slot="table" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    width="200px"
                    aria-sort={
                      !column.isSorted
                        ? "none"
                        : column.isSortedDesc
                        ? "descending"
                        : "ascending"
                    }
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </ScaleTable>
    </Layout>
  )
}

export default IndexPage
