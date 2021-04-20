import React from "react"
import PropTypes from "prop-types"
import "@telekom/scale-components-neutral/dist/scale-components/scale-components.css"
import "./layout.css"

const Layout = ({ children }) => {
  return <div className="layout">{children}</div>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
