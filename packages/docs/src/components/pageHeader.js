import React from "react"

import "./pageHeader.css"

export default function PageHeader({ header, subheader }) {
  return (
    <header>
      {header && <h1>{header}</h1>}
      {subheader && <h2>{subheader}</h2>}
    </header>
  )
}
