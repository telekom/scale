import { Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'scale-search-list-category',
  styleUrl: 'search-list-category.css',
  shadow: true,
})
export class SearchListCategory {
  @Element() hostElement: HTMLElement;

  @Prop() refListBoxEl: any;

  render() {
    return (
      <Host>
        <div part="base">
          <div part="head">
            <slot name="title"></slot>
            <slot name="action"></slot>
          </div>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
