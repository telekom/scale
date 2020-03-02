import React, { Fragment } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Header from "../components/header"
import Sidebar from "../components/sidebar"

import "./documentation.css"

export default ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      sidebar: allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              filename
              section
            }
          }
        }
      }
      title: site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
      <Fragment>
        <Helmet>
        <title>{data.title.siteMetadata.title}</title>
        <script
          type="module"
          src="/dist/telements-components/telements-components.esm.js"
        ></script>
        <script nomodule="" src="/dist/telements-components.js"></script>
      </Helmet>
      <main className="main">
        <div className="main__sidebar">
          <Header />
          <Sidebar
            currentPage={location.pathname}
            components={data.sidebar.edges}
          />
        </div>
        <section className="main__content">
          <div className="content">{children}</div>
        </section>
      </main>
      </Fragment>
  )
}
