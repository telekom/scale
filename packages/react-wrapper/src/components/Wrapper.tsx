import React, { useRef, useEffect } from 'react'

const WebComponentWrapper = (props: any) => {
  const { events, component, styles, children, ...forwardedProps } = props
  const eventNames: string[] | null = events ? Object.keys(events) : null
  const Component = component
  const ref = useRef<any>(null)
  useEffect(() => {
    if (ref.current) {
      if (styles) {
        ref.current.updateStyles(styles)
        console.log('ref.current', ref.current)
        console.log('ref.current.styles', ref.current.styles)
      }
      if (eventNames) {
        eventNames.map((eventName: string) =>
          ref.current.addEventListener(events[eventName], props[eventName])
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  return (
    <Component ref={ref} {...forwardedProps}>
      {children}
    </Component>
  )
}

export default WebComponentWrapper
