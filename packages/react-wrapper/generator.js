const fs = require('fs')
const _ = require('lodash')
const docs = require('../components/dist/telements-components.json')

function capitalizeFirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const propsTemplate = props => {
  let template = ''
  template += '{'
  props.forEach(({ name, type }) => {
    template += `  ${name}: ${type};`
  })
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

const interfaceTemplate = (name, props) => {
  let template = ''
  template += `interface ${name}Interface `
  template += propsTemplate(props)
  return template
}

const componentTemplate = ({ name, tag, props, events }) =>
  `${interfaceTemplate(name, props)}

const ${name} = (props: ${name}Interface) => (
	<WebComponentWrapper
		events={${eventsTemplate(events)}}
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
}`
const convertToReact = components => {
  const reactData = {}
  components.forEach(component => {
    const reactComponent = capitalizeFirst(
      _.camelCase(component.tag.replace('t-', ''))
    )
    reactData[reactComponent] = {
      tag: component.tag,
      name: reactComponent,
      props:
        component.props.map(({ name, values, optional, type }) => ({
          name,
          values,
          optional,
          type
        })) || [],
      events:
        component.events.map(({ event }) => ({
          reactEvent: `on${capitalizeFirst(event)}`,
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
