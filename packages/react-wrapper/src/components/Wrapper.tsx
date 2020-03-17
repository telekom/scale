import React, { useRef, useEffect } from 'react'

const kebabCase = require('lodash').kebabCase

const WebComponentWrapper = (props: any) => {
  const { events, component, styles, children, ...forwardedProps } = props
  const eventNames: string[] | null = events ? Object.keys(events) : null
  const Component = component
  const ref = useRef<any>(null)
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
  useEffect(() => {
    if (ref.current) {
      if (styles) {
        ref.current.styles = styles
      }
      if (eventNames) {
        eventNames.map((eventName: string) =>
          ref.current.addEventListener(events[eventName], props[eventName])
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, styles])

  return (
    <Component ref={ref} {...convertedProps}>
      {children}
    </Component>
  )
}

export default WebComponentWrapper
