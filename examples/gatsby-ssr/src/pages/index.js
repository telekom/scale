import React, { useRef } from "react"
import {
  ScaleButton,
  ScaleCard,
  ScaleLink,
  ScaleTag,
  ScaleTextField,
  ScaleDatePicker,
  ScaleTextarea
} from "@telekom/scale-components-react-neutral"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const dateRef = useRef(null)
  return (
    <Layout>
      <SEO title="Home" />

      <h2>Link</h2>
      <ScaleLink href="http://example.com" target="_blank" variant="success">
        Success
      </ScaleLink>
      <h2>Date Picker</h2>
      <ScaleDatePicker
        ref={dateRef}
        onScaleChange={console.log}
        onScaleFocus={console.log}
        onScaleBlur={console.log}
        value="2021-03-24"
        label="pick a date"
      />
      <h2>Button</h2>
      <ScaleButton variant="primary" onClick={() => dateRef.current.show()}>
        Show date picker
      </ScaleButton>
      <h2>Card</h2>
      <ScaleCard>A title</ScaleCard>
      <h2>Tag</h2>
      <ScaleTag dismissable size="small" onClose={event => console.log(event)}>
        A title
      </ScaleTag>
      <h2>Text Field</h2>
      <ScaleTextField
        value="initial value"
        onScaleChange={console.log}
        label="Text Field"
      />
      <h2>Text Area</h2>
      <ScaleTextarea
        value="initial value"
        onScaleChange={console.log}
        label="Text Area"
        rows={10}
      />
    </Layout>
  )
}

export default IndexPage
