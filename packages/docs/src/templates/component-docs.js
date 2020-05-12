import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import DocsLayout from "../layouts/documentation"
// import { ComponentPlayground } from "./component-playground"
import { ComponentUsage } from "./component-usage"
import { ComponentProps } from "./component-props"
import { ComponentMethods } from "./component-methods"
import { ComponentEvents } from "./component-events"
import { ComponentDependencies } from "./component-dependencies"
import SEO from "../components/seo"
import componentsDocs from "./../../stencil/dist/scale-components.json"
import "./component-docs.css"
import { ComponentGeneral } from "./component-general"
import { parse } from "@textlint/markdown-to-ast"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  location,
}) {
  const { markdownRemark } = data
  const { fields, frontmatter, htmlAst } = markdownRemark

  const defaultProps = (componentDocs) => {
    let obj = {}
    componentDocs &&
      componentDocs.props &&
      componentDocs.props.map((prop) => {
        if (prop.name !== "styles") {
          obj[prop.name] =
            prop.default && prop.default !== "''" ? prop.default : ""
        }
        if (prop.name === "timeout") {
          obj[prop.name] = 300000
        }
        return null
      })
    return obj
  }

  // Determine page title based on section
  // If components, we use filename to mimic web component style
  // Otherwise it's probably a page, so display the nicer frontmatter title
  let pageTitle
  if (fields.section && fields.section === "components") {
    pageTitle = fields.filename.replace("/", "")
  } else {
    pageTitle = frontmatter && frontmatter.title
  }

  const ComponentName = htmlAst.children[0].children[0].value || pageTitle
  const componentDocs = componentsDocs.components.filter(
    (component) => component.tag === ComponentName
  )[0]
  const [componentState, setComponentState] = useState(
    defaultProps(componentDocs)
  )

  useEffect(() => {
    setComponentState({
      ...componentState,
      ...defaultProps(componentDocs),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentDocs])

  const { styles, ...componentProps } = componentState
  const usage = componentDocs && componentDocs.usage ? componentDocs.usage : {}
  const usageExamples =
    Object.keys(usage).length > 0
      ? Object.keys(usage).map((example) => parse(usage[example]))
      : []

  return (
    <DocsLayout location={location}>
      <SEO title={pageTitle} />
      <h1>{ComponentName}</h1>

      <div className="preview">
        <ComponentGeneral componentDocs={componentDocs} />
        <ComponentUsage usageExamples={usageExamples} />
        <ComponentProps componentDocs={componentDocs} />
        <ComponentMethods componentDocs={componentDocs} />
        <ComponentEvents componentDocs={componentDocs} />
        <ComponentDependencies componentDocs={componentDocs} />

        {/*{fields.section && fields.section === "components" && (*/}
        {/*  <ComponentPlayground*/}
        {/*    {...{*/}
        {/*      ComponentName,*/}
        {/*      componentProps,*/}
        {/*      componentState,*/}
        {/*      componentDocs,*/}
        {/*      setComponentState,*/}
        {/*    }}*/}
        {/*  />*/}
        {/*)}*/}
      </div>
    </DocsLayout>
  )
}
export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      htmlAst
      frontmatter {
        title
      }
      fields {
        slug
        filename
        section
      }
    }
  }
`
