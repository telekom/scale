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
          src="/dist/scale-components/scale-components.esm.js"
        ></script>
        <script nomodule="" src="/dist/scale-components.js"></script>
        <script>
          {`if (typeof window !== undefined) {
            window.scale = {
              theme: {
                Button: {
                  button: {
                    borderColor: 'rgba(0,0,0,.1)'
                  }
                }
              }
            }
          }`}
        </script>
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
