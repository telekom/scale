/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import { useTheme } from "@scaleds/components/dist/theme"

import "./src/assets/css/prism-ghcolors.css"

import wrapWithProvider from "./src/layouts/providers"

useTheme({
  shape: {
    borderRadius: 24,
  },
})

export const wrapRootElement = wrapWithProvider
