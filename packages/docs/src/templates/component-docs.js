import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
// import rehypeReact from "rehype-react"
import DocsLayout from "../layouts/documentation"
import {ComponentPlayground} from "./component-playground"
import {ComponentUsage} from "./component-usage"
import {ComponentProps} from "./component-props"
import {ComponentMethods} from "./component-methods"
import {ComponentEvents} from "./component-events"
import {ComponentDependencies} from "./component-dependencies"
import SEO from "../components/seo"
import componentsDocs from './../../stencil/dist/scale-components.json'
import './component-docs.css'
import { ComponentGeneral } from "./component-general"
var parse = require("@textlint/markdown-to-ast").parse;

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  location,
}) {
  // Customize the Markdown components here
  // const renderAst = new rehypeReact({
  //   createElement: React.createElement,
  //   components: {
  //     table: "table",
  //     "page-header": PageHeader,
  //   },
  // }).Compiler

  const { markdownRemark } = data
  const { fields, frontmatter, htmlAst } = markdownRemark

  const defaultProps = (componentDocs) => {
    let obj = {}
    componentDocs && componentDocs.props && componentDocs.props.map(prop => {
      if (prop.name !== 'styles') {
        obj[prop.name] = prop.default && prop.default !== "''" ? prop.default : ''
      }
      if (prop.name === 'timeout') {
        obj[prop.name] = 300000
      }
      return null
    })
    return obj;
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
  const componentDocs = componentsDocs.components.filter(component => component.tag === ComponentName)[0]
  const [componentState, setComponentState] = useState(defaultProps(componentDocs))

  // const componentAst = {
  //   ...htmlAst,
  //   children: [
  //     ...htmlAst.children && htmlAst.children.length > 0 ? htmlAst.children.slice(2, -3) : []
  //   ]
  // }
  useEffect(() => {
    setComponentState({
      ...componentState,
      ...defaultProps(componentDocs)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentDocs])

  const {styles, ...componentProps} = componentState;
  const usage = componentDocs && componentDocs.usage ? componentDocs.usage : {}
  const usageExamples = Object.keys(usage).length > 0 ? Object.keys(usage).map(example => parse(usage[example])) : []

  return (
    <DocsLayout location={location}>
      <SEO title={pageTitle} />
      <h1>{ComponentName}</h1>
      {/* {fields.section && fields.section === "components" && (
        <ComponentPlayground {...{ComponentName, componentProps, componentState, componentDocs, setComponentState}} />
      )} */}
      <div className="preview">
        <ComponentGeneral {...{componentDocs}} />
        <ComponentUsage {...{usageExamples}} />
        <ComponentProps {...{componentDocs}} />
        <ComponentMethods {...{componentDocs}} />
        <ComponentEvents {...{componentDocs}} />
        <ComponentDependencies {...{componentDocs}} />
        {/* <div className="stencil__docs">
          {renderAst(componentAst)}
        </div> */}
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
