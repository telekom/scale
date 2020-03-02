import React from "react"
import { Link } from "gatsby"

const Sidebar = ({ components, currentPage }) => {
  const pages = [
    {
      name: "Getting Started",
      url: "/getting-started",
    },
    {
      name: "Components",
      url: "/components/alert",
    }
  ]
  const componentList = components.sort(function(a, b){ if(a.node.fields.filename < b.node.fields.filename) { return -1; } if(a.node.fields.filename > b.node.fields.filename) { return 1; } return 0; }).map(component => {
    const {
      node: {
        fields: { section, slug, filename },
      },
    } = component
    if (section === "components") {
      // Set active depending on currentPage vs slug
      return (
        <li
          className={`menu__item ${currentPage.includes(slug.slice(0, -1)) ? `menu__item--selected` : ""}`}
          key={slug}
        >
          <Link to={`/${slug}`}>
            {filename.replace("/", "")}
          </Link>
        </li>
      )
    }
    return null
  })

  const pageList = pages.map(page => {
    // Set active depending on currentPage vs slug
    return (
      <li key={page.url} className={`menu__item ${currentPage.includes(page.url) ? `menu__item--selected` : ""}`}
      >
        <Link to={`${page.url}`}>
          {page.name}
        </Link>
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
            href="https://github.com/telekom/telements"
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
