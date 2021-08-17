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
  /** (optional) number of columns */
  @Prop() cols?: number = 1;
  /** (optional) number of rows */
  @Prop() rows?: number = 1;

  render() {
    return (
      <Host>
        <style>{this.styles}</style>
        <div 
			class="grid"
			style={{ 
				'grid-template-columns': `repeat(${this.cols}, 1fr)`,
				'grid-template-rows': `repeat(${this.rows}, ${100 / this.rows}% [col-start])`
			  }}>
			<slot />
		</div>
      </Host>
    );
  }
}
