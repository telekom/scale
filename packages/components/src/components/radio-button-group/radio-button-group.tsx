import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'scale-radio-button-group',
  styleUrl: './radio-button-group.css',
  shadow: true,
})
export class CheckboxGroup {
  render() {
    return (
      <Host>
        <div class="radio-button-group">
          <div class="radio-button-group__label">
            <slot name="radio-button-label" />
          </div>
          <div class="radio-button-group__container">
            <slot name="radio-button-list" />
          </div>
        </div>
      </Host>
    );
  }
}
