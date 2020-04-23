import React, { useState, useEffect, useRef } from "react"
import { graphql } from "gatsby"
import rehypeReact from "rehype-react"
import DocsLayout from "../layouts/documentation"
import SEO from "../components/seo"
import PageHeader from "../components/pageHeader"
import componentsDocs from './../../stencil/dist/scale-components.json'
import './component-docs.css'

function parseStencilDocs(json) {
  let enhanced = {};
  Object.keys(json).forEach((key) => {
    if (Array.isArray(json[key])) {
      return enhanced[key] = json[key].map(nestedJson => {
        if (typeof nestedJson === 'string') {
          return nestedJson
        }
        return parseStencilDocs(nestedJson)
      })
    } else if (typeof json[key] === 'object') {
      return enhanced[key] = parseStencilDocs(json[key])
    } else {
      const regex = /\|/g;
      if (typeof json[key] === 'string' && json[key].search(regex) !== -1) {
        const cleaned = json[key]
          .split('|')
          .map(e => e.replace(String.fromCharCode(92), '').trim())
          .join(',\n')
          .split('<')
          .join('<\n')
          .split('>')
          .join('>\n')
        return enhanced[key] = cleaned
      }
      return enhanced[key] = json[key]
    }
  })
  return enhanced;
}

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  location,
}) {
  // Customize the Markdown components here
  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
      table: "table",
      "page-header": PageHeader,
    },
  }).Compiler

  const { markdownRemark } = data

  const { fields, frontmatter, htmlAst } = markdownRemark

  const defaultProps = (componentDocs) => {
    let obj = {}
    componentDocs && componentDocs.props && componentDocs.props.map(prop => {
      if (prop.name !== 'styles') {
        obj[prop.name] = prop.default && prop.default !== "''" ? prop.default : ''
      }
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

  const componentAst = {
    ...htmlAst,
    children: [
      ...htmlAst.children && htmlAst.children.length > 0 ? htmlAst.children.slice(2, -3) : []
    ]
  }
  useEffect(() => {
    setComponentState({
      ...componentState,
      ...defaultProps(componentDocs)
    })
  }, [componentDocs])

  const ref = useRef(null)

  useEffect(() => {
    if (ref && ref.current ) {
      ref.current.styles = componentState.styles;
    }
  }, [componentState])

  const {styles, ...componentProps} = componentState;
  return (
    <DocsLayout location={location}>
      <SEO title={pageTitle} />
      <h1>{ComponentName}</h1>
      {fields.section && fields.section === "components" && (
        <div className="playground">
          <h2>Playground</h2>
            <div className="playground__preview fade-in" >
              <div>
                {ComponentName.startsWith('scale-') && (
                  <ComponentName ref={ref} {...componentProps} >{componentState.children || 'Label'}</ComponentName>
                )}
              </div>
            </div>
            <div className="playground__controls">
              <div key={'children'}>
                <div className="control__label">Label</div>
                <input className="control__input" value={componentState.children} name="children" onChange={e => setComponentState({...componentState, children: e.target.value})} />
              </div>
              {componentDocs && componentDocs.props && componentDocs.props.map(prop => {
                if (prop.attr === 'variant') {
                  return (
                    <div key={prop.attr}>
                      <div className="control__label">{prop.attr}</div>
                      <select value={componentState[prop.name]} onChange={e => setComponentState({...componentState, [prop.name]: e.target.value})}>
                        <option value="primary">Primary</option>
                        <option value="secondary">Secondary</option>
                        <option value="danger">Danger</option>
                        <option value="success">Success</option>
                        <option value="error">Error</option>
                      </select>
                    </div>
                  )
                } else if (prop.type === 'string') {
                  return (
                    <div key={prop.attr}>
                      <div className="control__label">{prop.attr}</div>
                      <input className="control__input" value={componentState[prop.name]} name={prop.name} onChange={e => setComponentState({...componentState, [prop.name]: e.target.value})} />
                    </div>
                  )
                } else if (prop.type === 'number') {
                  return (
                    <div key={prop.attr}>
                      <div className="control__label">{prop.attr}</div>
                      <input className="control__input" value={componentState[prop.name]} name={prop.name} type="number" onChange={e => setComponentState({...componentState, [prop.name]: e.target.value})} />
                    </div>
                  )
                } else if (prop.type === 'boolean') {
                  return (
                    <div key={prop.attr}>
                      <div className="control__label">{prop.attr}</div>
                      <select value={componentState[prop.name]} onChange={e => setComponentState({...componentState, [prop.name]: e.target.value})}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    </div>
                  )
                }
                return null
              })}
            </div>
            <div>
            {componentDocs && componentDocs.props && componentDocs.props.map(prop => {
              if (prop.type === 'StyleSheet<string | number | symbol>') {
                  return (
                    <div className="playground__styles" key={prop.name}>
                      <div className="control__label">{prop.name}</div>
                      <textarea
                        className="control__input"
                        name={prop.name}
                        onChange={e => setComponentState({...componentState, [prop.name]: e.target.value} )}
                      >
                      </textarea>
                      <button onClick={() => {
                        setComponentState({
                          ...componentState,
                          styles: JSON.parse(componentState.styles)
                        })
                      }}>
                        Apply style
                      </button>
                    </div>
                  )
                }
              })}
            </div>
        </div>
      )}
      {fields.section && fields.section === "components" && <h2>Docs</h2>}
      <div className="stencil__docs">
        {renderAst(parseStencilDocs(componentAst))}
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
