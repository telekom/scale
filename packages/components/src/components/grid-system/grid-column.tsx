import { Component, h, Host, Prop, Element } from '@stencil/core';

@Component({
  tag: 'scale-grid-column',
  styleUrl: 'grid-column.css',
  shadow: true,
})
export class GridColumn {
  @Element() hostElement: HTMLElement;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  render() {
    return (
      <Host>
        <style>{this.styles}</style>
        <div class="grid-column">
			<slot />
		</div>
      </Host>
    );
  }
}