import React from 'react'
import { StyleSheet } from 'jss'

const kebabCase = require('lodash').kebabCase

interface WebComponentWrapperProps {
  // Web component wrapper props
  events?: any
  component: string
  styles?: StyleSheet<string | number | symbol>
  children?: React.ReactNode
}

class WebComponentWrapper extends React.Component<WebComponentWrapperProps> {
  private componentRef = React.createRef<any>()

  componentDidMount () {
    const { styles, events } = this.props
    const eventNames: string[] | null = events ? Object.keys(events) : null

    if (this.componentRef.current!) {
      if (styles) {
        this.componentRef.current!.styles = styles
      }
      if (eventNames) {
        eventNames.map((eventName: string) =>
          this.componentRef.current!.addEventListener(
            events[eventName],
            this.props[eventName]
          )
        )
      }
    }
  }

  render () {
    const { component, styles, children, ...forwardedProps } = this.props

    const Component = component
    var convertedProps = {}
    Object.keys(forwardedProps).forEach(function (prop) {
      if (prop === 'className') {
        convertedProps['custom-class'] = forwardedProps[prop]
      } else if (!prop.startsWith('on')) {
        convertedProps[kebabCase(prop)] = forwardedProps[prop]
      } else {
        convertedProps[prop] = forwardedProps[prop]
      }
    })

    return (
      <Component ref={this.componentRef} {...convertedProps}>
        {children}
      </Component>
    )
  }
}

export default WebComponentWrapper
