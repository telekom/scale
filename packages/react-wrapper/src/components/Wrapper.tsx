import React,  { Component, createRef } from "react";

const kebabCase = require("lodash").kebabCase;

class WebComponentWrapper extends Component {
  constructor(props) {
    super(props);
    this.componentRef = createRef();
  }

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
      if (this.componentRef.current) {
        if (styles) {
          this.componentRef.current.styles = styles;
        }
        if (eventNames) {
          eventNames.map((eventName: string) =>
            this.componentRef.current.addEventListener(events[eventName], this.props[eventName])
          );
        }
      }
    }

    return (
      <Component ref={this.componentRef} {...convertedProps}>
        {children}
      </Component>
    );
  }
}

export default WebComponentWrapper;
