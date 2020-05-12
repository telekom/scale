import React from 'react';

import {
  attachEventProps,
  createForwardRef,
  dashToPascalCase,
} from './utils/index';

interface IonicReactInternalProps<ElementType> extends React.HTMLAttributes<ElementType> {
  forwardedRef?: React.Ref<ElementType>;
  ref?: React.Ref<any>;
  styles?: any;
}

export const createReactComponent = <PropType, ElementType>(tagName: string) => {
  const displayName = dashToPascalCase(tagName);
  const ReactComponent = class extends React.Component<IonicReactInternalProps<ElementType>> {

    private ref: React.RefObject<HTMLElement>;

    constructor(props: IonicReactInternalProps<ElementType>) {
      super(props);
      this.ref = React.createRef<HTMLElement>();
    }

    componentDidMount() {
      this.componentDidUpdate(this.props);
    }

    componentDidUpdate(prevProps: IonicReactInternalProps<ElementType>) {
      const node = this.ref.current;
      attachEventProps(node, this.props, prevProps);
    }

    render() {
      return React.createElement(tagName, {
        ...this.props,
        ...(this.props.styles
          ? { styles: JSON.stringify(this.props.styles) }
          : {}),
        ref: this.ref,
      }, this.props.children);
    }

    static get displayName() {
      return displayName;
    }
  };
  return createForwardRef<PropType, ElementType>(ReactComponent, displayName);
};
