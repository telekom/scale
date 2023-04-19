import { Component, Element, h } from '@stencil/core';

@Component({
  tag: 'scale-search-list-item',
  styleUrl: 'search-list-item.css',
  shadow: true,
})
export class SearchSelectItem {
  @Element() hostElement: HTMLElement;

  render() {
    return (
      <div part="base">
        <div part="prefix">
          <slot name="prefix"></slot>
        </div>

        <div part="text">
          <div part="label">
            <slot></slot>
          </div>
          <div part="supporting-text">
            <slot name="supporting-text"></slot>
          </div>
        </div>

        <div part="suffix">
          <slot name="suffix"></slot>
        </div>
      </div>
    );
  }
}
