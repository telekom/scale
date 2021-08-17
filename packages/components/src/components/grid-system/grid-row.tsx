import { Component, h, Host, Prop, Element } from '@stencil/core';

@Component({
  tag: 'scale-grid-row',
  styleUrl: 'grid-row.css',
  shadow: true,
})
export class GridRow {
  @Element() hostElement: HTMLElement;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  render() {
    return (
      <Host>
        <style>{this.styles}</style>
        <div class="grid-row">
			<slot />
		</div>
      </Host>
    );
  }
}
