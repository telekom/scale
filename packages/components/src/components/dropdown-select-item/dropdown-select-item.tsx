import { Component, Element, h, Prop } from '@stencil/core';

@Component({
  tag: 'scale-dropdown-select-item',
  styleUrl: 'dropdown-select-item.css',
  shadow: true,
})
export class DropdownSelectItem {
  @Element() hostElement: HTMLElement;
  @Prop() selected?: boolean;
  @Prop() focused?: boolean;
  @Prop({ reflect: true }) value?: any;
  @Prop({ reflect: true }) disabled?: boolean;

  render() {
    return (
      <div part="base">
        <div part="prefix">
          <slot name="prefix"></slot>
        </div>

        <div part="label">
          <slot></slot>
        </div>
        <div part="suffix">
          <slot name="suffix"></slot>
        </div>
      </div>
    );
  }
}
