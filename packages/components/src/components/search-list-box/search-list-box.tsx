import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'scale-search-list-box',
  styleUrl: 'search-list-box.css',
  shadow: true,
})
export class SearchListBox {
  @Prop() open?: boolean;
  @Prop() comboboxId?: string = 'combobox';
  @Prop() refListBoxPadEl: any;
  @Prop() refListBoxEl: any;

  render() {
    return (
      <Host open={this.open}>
        <div part="listbox-pad" ref={this.refListBoxPadEl}>
          <div part="listbox-scroll-container">
            <div
              part="listbox"
              role="listbox"
              id={`${this.comboboxId}-listbox`}
              aria-labelledby={`${this.comboboxId}-label`}
              tabindex="-1"
            >
              <slot></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
