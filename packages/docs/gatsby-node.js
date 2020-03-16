/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const markdownPath = createFilePath({ node, getNode, basePath: `pages` })
    const isComponent = markdownPath.includes("readme")
    let section
    if (isComponent) {
      section = "components"
    } else {
      section = "page"
    }
    // Generate page titles and slugs from file name
    // Remove slashes and readme from component filenames
    const slug = markdownPath.replace("readme/", "")
    const fileName = slug.replace("/", "")
    if (isComponent) {
      createNodeField({
        node,
        name: `slug`,
        value: `components${slug}`,
      })
    } else {
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })
    }
    createNodeField({
      node,
      name: `filename`,
      value: fileName,
    })
    createNodeField({
      node,
      name: `section`,
      value: section,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  // Create blog post pages.
  const posts = result.data.allMarkdownRemark.edges
  // We'll call `createPage` for each result
  posts.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: require.resolve(`./src/templates/component-docs.js`),
      // We can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })

  // Create pagination archive pages
  // await createMdxPagination("blog", "blog", graphql, createPage, reporter)
}
