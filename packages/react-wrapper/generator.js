const fs = require('fs')
const _ = require('lodash')
const docs = require('../components/dist/scale-components.json')

function capitalizeFirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const propsTemplate = (props, events) => {
  let template = ''
  template += '{'
  template += `
		// Web-component props
	`
  props.forEach(({ name, type, optional }) => {
    template += `${name}${optional ? '?' : ''}: ${type};`
  })
  if (events && events.length > 0) {
    template += `
			// Web-component custom events
			// TODO: Provide events types
		`
    events.forEach(({ reactEvent }) => {
      template += `${reactEvent}?: (event?: any) => void;`
    })
  }
  template += `
		// Allow custom props not yet specified in the types e.g. events onClick etc.
		// TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
		[key: string]: any;`
  template += '}'
  return template
}

const eventsTemplate = events => {
  let template = ''
  template += '{'
  events.forEach(({ reactEvent, event }) => {
    template += `${reactEvent}: '${event}',`
  })
  template += '}'
  return template
}

const interfaceName = name => `${name}Props`

const interfaceTemplate = (name, props, events) => {
  let template = ''
  template += `interface ${interfaceName(name)}`
  template += propsTemplate(props, events)
  return template
}

const componentTemplate = ({ name, tag, props, events }) =>
  `${interfaceTemplate(name, props, events)}
const ${name}: React.FunctionComponent<${interfaceName(name)}> = (props) => (
	<WebComponentWrapper
		${events && events.length > 0 ? `events={${eventsTemplate(events)}}` : ''}
		component="${tag}"
		{...props}
	/>
);`

const componentsMarkup = components => {
  let template = ''
  Object.keys(components).forEach(component => {
    template += componentTemplate(components[component])
  })
  return template
}

const componentsList = components => {
  let template = ''
  Object.keys(components).forEach(component => {
    template += `${components[component].name},`
  })
  return template
}

const componentsTemplate = components => `
import * as React from 'react'
import WebComponentWrapper from './Wrapper'

${componentsMarkup(components)}

export {
	${componentsList(components)}
}
`

const indexTemplate = components =>
  `import {
		${componentsList(components)}
	} from './components/Components'

	export {
		${componentsList(components)}
	}
`

const convertToReact = components => {
  const reactData = {}
  components.forEach(component => {
    const reactComponent = capitalizeFirst(
      _.camelCase(component.tag.replace('scale-', ''))
    )
    reactData[reactComponent] = {
      tag: component.tag,
      name: reactComponent,
      props:
        component.props.map(({ name, values, optional, type }) => ({
          name,
          values,
          optional,
          type: name === 'styles' ? `Record<string, any>` : type
        })) || [],
      events:
        component.events.map(({ event }) => ({
          reactEvent: `on${capitalizeFirst(
            _.camelCase(event.replace('Event', ''))
          )}`,
          event
        })) || []
    }
  })
  return reactData
}

fs.writeFile(
  './src/components/Components.tsx',
  componentsTemplate(convertToReact(docs.components)),
  error => {
    if (error) {
      return console.error(error)
    }
    console.log('React component generation complete')
  }
)

fs.writeFile(
  './src/index.ts',
  indexTemplate(convertToReact(docs.components)),
  error => {
    if (error) {
      return console.error(error)
    }
    console.log('React index generation complete')
  }
)
