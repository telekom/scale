/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import "prismjs"
import "prismjs/themes/prism.css"
import {
  defineCustomElements,
  applyPolyfills,
} from "@scaleds/components/loader"

applyPolyfills().then(() => {
  defineCustomElements(window)
})

import wrapWithProvider from "./src/layouts/providers"

export const wrapRootElement = wrapWithProvider
