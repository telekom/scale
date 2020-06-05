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
      site {
        config {
          featuredComponents
        }
      }
    }
  `)
  return (
    <Fragment>
      <Helmet>
        <title>{data.title.siteMetadata.title}</title>
      </Helmet>
      <main className="main">
        <div className="main__sidebar">
          <Header />
          <Sidebar
            currentPage={location.pathname}
            components={data.sidebar.edges}
            featuredComponents={data.site.config.featuredComponents}
          />
        </div>
        <section className="main__content">
          <div className="content">{children}</div>
        </section>
      </main>
    </Fragment>
  )
}
