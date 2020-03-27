import React, {useRef, useEffect, useState} from "react"
import ReactDOM from 'react-dom'
import { v4 as uuid } from 'uuid';
import './component-usage-example.css'

const iframeMarkup = (component) => `
	<!DOCTYPE html>
	<html>
		<style>
			body {
				margin: 0;
				padding: 16px;
				font-family: 'Helvetica';
				overflow: hidden;
			}
		</style>
		<head>
			<script type="module" src="/dist/scale-components/scale-components.esm.js"></script>
		</head>
		<body>
			${component}
		</body>
	</html>
`

export const ComponentUsageExample = (childExample) => {
	const iframeRef = useRef(null)
	const [width, setWidth] = useState('100%')

	const adjustHeight = () => {
		const iframeDOMNode = ReactDOM.findDOMNode(iframeRef.current)
		setTimeout(() => {
			iframeDOMNode.classList.remove('initial')
			iframeDOMNode.height = iframeDOMNode.contentWindow.document.body.scrollHeight
		}, 1000);
	}

  useEffect(() => {
    if (iframeRef && iframeRef.current ) {
			adjustHeight()
    }
	}, [iframeRef])

	return (
		<div className="component-usage-example">
			<div className="controls">
				<scale-button class="control" size="small" onClick={() => setWidth('320px')}>Mobile</scale-button>
				<scale-button class="control" size="small" onClick={() => setWidth('767px')}>Tablet</scale-button>
				<scale-button class="control" size="small" onClick={() => setWidth('1024px')}>Desktop</scale-button>
				<scale-button class="control" size="small" onClick={() => setWidth('100%')}>Auto</scale-button>
				<span className="controls__current">
					Current: {width}
				</span>
			</div>
			<div className="frame">
				<iframe
					title={uuid()}
					className="preview__frame initial"
					ref={iframeRef}
					srcDoc={iframeMarkup(childExample.value)}
					style={{width}}
				/>
			</div>
		</div>
	)
}
