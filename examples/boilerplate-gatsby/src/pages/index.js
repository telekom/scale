import React from "react"
import {
  ScaleButton,
  ScaleCard,
  ScaleLink,
  ScaleTag,
  ScaleTable,
  ScaleProgressBar,
    ScaleInput

} from "@scaleds/components-react"
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
          <h3>Alert</h3>
          <ScaleLink href="http://example.com" target="_blank" variant="success">
              Success
          </ScaleLink>
          <h3>Button</h3>
          <ScaleButton variant="primary">Click!</ScaleButton>
          <h3>Card</h3>
          <ScaleCard>A title</ScaleCard>
          <h3>Tag</h3>
          <ScaleTag dismissable size="small" onClose={(event) => console.log(event)}>A title</ScaleTag>
          <h3>Input</h3>
          <ScaleInput styles={{ input: { "& input": { color: "blue" } } }} />
          <h3>Table</h3>
          <ScaleTable variant="regular">
              <table>
                  <thead>
                  <tr>
                      <th aria-sort="descending">Title</th>
                      <th>Tags</th>
                      <th>Stats</th>
                      <th style={{ textAlign: "right" }}>Time</th>
                      <th style={{ textAlign: "right" }}>Euros</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td>University of Plymouth</td>
                      <td>
                          <ScaleTag style={{ marginRight: "8px" }}>Other</ScaleTag>
                          <ScaleTag style={{ marginRight: "8px" }}>N/A</ScaleTag>
                          <ScaleTag>Demo</ScaleTag>
                      </td>
                      <td>
                          <div style={{ display: "inline-flex", alignItems: "center" }}>
                              <span style={{ marginRight: "8px" }}>1.356</span>
                              <ScaleProgressBar
                                  variant="info"
                                  style={{ maxWidth: "120px" }}
                                  stroke-width="6"
                                  percentage="90"
                              />
                          </div>
                      </td>
                      <td style={{ textAlign: "right" }}>00:00:20</td>
                      <td style={{ textAlign: "right" }}>100.245,10</td>
                  </tr>
                  </tbody>
              </table>
          </ScaleTable>
      </Layout>
  )
}

export default IndexPage
