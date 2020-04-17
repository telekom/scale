import React from "react";

const kebabCase = require("lodash").kebabCase;

class WebComponentWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  ref = React.createRef();

  render() {
    const {
      events,
      component,
      styles,
      children,
      ...forwardedProps
    } = this.props;

    const eventNames: string[] | null = events ? Object.keys(events) : null;
    const Component = component;
    var convertedProps = {};
    Object.keys(forwardedProps).forEach(function(prop) {
      if (prop === "className") {
        convertedProps["custom-class"] = forwardedProps[prop];
      } else if (!prop.startsWith("on")) {
        convertedProps[kebabCase(prop)] = forwardedProps[prop];
      } else {
        convertedProps[prop] = forwardedProps[prop];
      }
    });

    componentDidMount() {
      if (this.ref.current) {
        if (styles) {
          this.ref.current.styles = styles;
        }
        if (eventNames) {
          eventNames.map((eventName: string) =>
            this.ref.current.addEventListener(events[eventName], this.props[eventName])
          );
        }
      }
    }

    return (
      <Component ref={this.ref} {...convertedProps}>
        {children}
      </Component>
    );
  }
}

export default WebComponentWrapper;
