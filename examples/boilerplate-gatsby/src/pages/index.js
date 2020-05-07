import React from "react"
import { ScaleButton, ScaleCard, ScaleLink, ScaleTag, ScaleInput } from '@scaleds/components-react';

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h3>Alert</h3>
    <ScaleLink href="http://example.com" target="_blank" variant="success">Success</ScaleLink>
    <h3>Button</h3>
    <ScaleButton variant="primary">Click!</ScaleButton>
    <h3>Card</h3>
    <ScaleCard>A title</ScaleCard>
    <h3>Tag</h3>
    <ScaleTag dismissable size="small" onClose={(event) => console.log(event)}>A title</ScaleTag>
    <h3>Input</h3>
    <ScaleInput styles={{ input: { "& input": { color: "blue" } } }} />
  </Layout>
)

export default IndexPage
