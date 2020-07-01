import React from "react"
import { ComponentUsageExample } from "./component-usage-example"
import "./component-usage.css"

export const ComponentUsage = ({ usageExamples, namespace }) => {
  if (!usageExamples || usageExamples.length === 0) {
    return null
  }
  return (
    <div className="components__usage">
      <h2>Usage</h2>
      {usageExamples.map((example) => {
        if (example.children && example.children.length > 0) {
          return example.children.map((childExample, childIndex) => {
            if (childExample.type === "Header") {
              return <h3 key={childIndex}>{childExample.children[0].value}</h3>
            }
            return (
              <div key={childIndex}>
                <ComponentUsageExample {...childExample} namespace={namespace} />
                <div className="example__code">
                  {typeof Prism !== "undefined" && (
                    <pre
                      dangerouslySetInnerHTML={{
                        __html: Prism.highlight(
                          childExample.raw,
                          Prism.languages.html
                        ),
                      }}
                    />
                  )}
                </div>
              </div>
            )
          })
        }
        return null
      })}
    </div>
  )
}
