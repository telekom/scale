# Scale Gatsby Plugin

A Gatsby plugin to enable custom Scale theme injection.

## Installation

- To install with npm: `npm install @scaleds/gatsby-react`
- To install using Yarn: `yarn add @scaleds/gatsby-react`

## Usage

Edit your `gatsby-config.js` and add a new entry into the plugins array, similar to the example below:

```js
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter...`,
    author: `@gatsbyjs`
  },
  plugins: [
    {
      resolve: "@scaleds/gatsby-plugin",
      // You can require and pass or inline your custom theme
      // via the `theme` property of the plugin `options` below:
      options: {
        theme: {
          shape: {
            borderRadius: 0
          },
        }
      }
    }
  ]
}
