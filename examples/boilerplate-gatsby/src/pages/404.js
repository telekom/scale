import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { ScaleButton } from "@scaleds/components-react"

const NotFoundPage = () => {
  const [variant, setVariant] = React.useState("primary")
  return (
    <Layout>
      <SEO title="404: Not found" />
      <Link to="/404">404</Link>
      <Link to="/">Home</Link>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>

      <ScaleButton variant="primary" onClick={() => setVariant("warning")}>
        Click Me!
      </ScaleButton>
      <ScaleButton variant={variant}> Hello </ScaleButton>
    </Layout>
  )
}

export default NotFoundPage
