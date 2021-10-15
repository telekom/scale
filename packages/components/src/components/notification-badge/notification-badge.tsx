import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'scale-notification-badge',
  styleUrl: './notification-badge.css',
  shadow: true,
})
export class Tooltip {
  /** (optional) Text that is displayed in the badge*/
  @Prop() label: string;

  render() {
    return (
      <Host>
        <a class="slot-wrapper">
          <slot />
          <span class="slot-wrapper__badge">{this.label}</span>
        </a>
      </Host>
    );
  }
}
