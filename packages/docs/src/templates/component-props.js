import React from "react"
import { Table } from "./component-table"
import "./component-props.css"

export const ComponentProps = ({ componentDocs }) => {
  if (
    !componentDocs ||
    !componentDocs.props ||
    componentDocs.props.length === 0
  ) {
    return null
  }

  const structure = [
    {
      title: "Description",
      value: (prop) => prop.docs,
    },
    {
      title: "Property",
      value: (prop) => prop.name,
    },
    {
      title: "Attribute",
      value: (prop) => prop.attr,
    },
    {
      title: "Optional",
      value: (prop) => (prop.optional ? "true" : "false"),
    },
    {
      title: "Required",
      value: (prop) => (prop.required ? "true" : "false"),
    },
    {
      title: "Mutable",
      value: (prop) => (prop.mutable ? "true" : "false"),
    },
    {
      title: "Reflect",
      value: (prop) => (prop.reflectToAttr ? "true" : "false"),
    },
    {
      title: "Type",
      value: (prop) => prop.type,
    },
    {
      title: "Default",
      value: (prop) => prop.default,
    },
  ]

  return (
    <div className="components__props">
      <h2>Props</h2>
      <Table structure={structure} values={componentDocs.props} />
    </div>
  )
}
