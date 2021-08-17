import { Component, h, Host, Prop, Element } from '@stencil/core';

@Component({
  tag: 'scale-grid-item',
  styleUrl: 'grid-item.css',
  shadow: true,
})
export class GridItem {
  @Element() hostElement: HTMLElement;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  /** (optional) column, where the grid item starts */
  @Prop() colStart?: number = 8;
  /** (optional) column, where the grid item ends */
  @Prop() colEnd?: number = 9;
  /** (optional) row, where the grid item starts */
  @Prop() rowStart?: number = 8;
  /** (optional) row, where the grid item ends */
  @Prop() rowEnd?: number = 9;

  render() {
    return (
      <Host
        style={{
          'grid-column-start': `${this.colStart}`,
          'grid-column-end': `${this.colEnd}`,
          'grid-row-start': `${this.rowStart}`,
          'grid-row-end': `${this.rowEnd}`,
        }}
      >
        <style>{this.styles}</style>
        <div class="grid-item">
          <slot />
        </div>
      </Host>
    );
  }
}
