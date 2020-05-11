import React from "react"
import { Link } from "gatsby"

const whiteList = ["button", "card", "link", "icon", "tag"]

const Sidebar = ({ components, currentPage }) => {
  const sortedComponents = components.sort((a, b) => {
    if (a.node.fields.filename < b.node.fields.filename) {
      return -1
    }
    if (a.node.fields.filename > b.node.fields.filename) {
      return 1
    }
    return 0
  })

  const filtered = sortedComponents.filter((c) => {
    if (whiteList.includes(c.node.fields.filename.replace("/", ""))) {
      return true
    } else if (c.node.fields.section !== "components") {
      return true
    }
    return false
  })

  const componentList = filtered.map((component) => {
    const {
      node: {
        fields: { section, slug, filename },
      },
    } = component
    if (section === "components") {
      // Set active depending on currentPage vs slug
      return (
        <li
          className={`menu__item ${
            currentPage.includes(slug.slice(0, -1))
              ? `menu__item--selected`
              : ""
          }`}
          key={slug}
        >
          <Link to={`/${slug}`}>{filename.replace("/", "")}</Link>
        </li>
      )
    }
    return null
  })

  const firstComponent =
    sortedComponents.filter((c) => c.node.fields.section === "components")[0]
      .node.fields.slug || "/"

  const pages = [
    {
      name: "Getting Started",
      url: "/getting-started",
    },
    {
      name: "Components",
      url: `/${firstComponent}`,
    },
  ]

  const pageList = pages.map((page) => {
    // Set active depending on currentPage vs slug
    return (
      <li
        key={page.url}
        className={`menu__item ${
          currentPage.includes(page.url) ? `menu__item--selected` : ""
        }`}
      >
        <Link to={`${page.url}`}>{page.name}</Link>
      </li>
    )
  })

  return (
    <nav className={`sidebar`}>
      <ul className="menu">{pageList}</ul>
      <span className="section__title">Components</span>
      <ul className="menu">{componentList}</ul>
      <span className="section__title">Meta</span>
      <ul className="menu">
        <li className="menu__item">
          <a
            href="https://github.com/telekom/scale"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar
