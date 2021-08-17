import { Component, h, Host, Prop, Element } from '@stencil/core';

@Component({
  tag: 'scale-grid',
  styleUrl: 'grid.css',
  shadow: true,
})
export class Grid {
  @Element() hostElement: HTMLElement;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  render() {
    return (
      <Host>
        <style>{this.styles}</style>
        <div class="grid">
			<slot />
		</div>
      </Host>
    );
  }
}
