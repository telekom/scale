import React, { useRef, useState } from "react"
import ReactDOM from "react-dom"
import { v4 as uuid } from "uuid"
import "./component-usage-example.css"

const iframeMarkup = (component) => `
<!DOCTYPE html>
<html>
  <head>
  <style>
    body {
      margin: 0;
      padding: 16px;
      font-family: 'Helvetica';
      overflow: hidden;
    }
  </style>
  <script src="/dist/scale-components/scale-components.js"></script>
  <script src="/dist/theme.iife.js"></script>
  </head>
  <body>
    ${component}
  </body>
</html>
`

export const ComponentUsageExample = (childExample) => {
  const [width, setWidth] = useState("100%")
  const iframeEl = useRef(null)

  const refresh = () => {
    const iframeDOMNode = ReactDOM.findDOMNode(iframeEl.current)

    const done = !!(
      iframeDOMNode &&
      iframeDOMNode.contentWindow &&
      iframeDOMNode.contentWindow.document &&
      iframeDOMNode.contentWindow.document.body.querySelector(".hydrated")
    )
    if (!done) {
      return setTimeout(refresh)
    }

    iframeDOMNode.height =
      iframeDOMNode.contentWindow.document.body.scrollHeight
    iframeDOMNode.classList.remove("initial")
  }

  return (
    <div className="component-usage-example">
      <div className="controls">
        <scale-button
          class="control"
          size="small"
          onClick={() => setWidth("320px")}
        >
          Mobile
        </scale-button>
        <scale-button
          class="control"
          size="small"
          onClick={() => setWidth("767px")}
        >
          Tablet
        </scale-button>
        <scale-button
          class="control"
          size="small"
          onClick={() => setWidth("1024px")}
        >
          Desktop
        </scale-button>
        <scale-button
          class="control"
          size="small"
          onClick={() => setWidth("100%")}
        >
          Auto
        </scale-button>
        <span className="controls__current">Current: {width}</span>
      </div>
      <div className="frame">
        {!!childExample.value && (
          <iframe
            onLoad={refresh}
            ref={iframeEl}
            title={uuid()}
            className="preview__frame initial"
            srcDoc={iframeMarkup(childExample.value)}
            style={{ width }}
          />
        )}
      </div>
    </div>
  )
}
