import { Component, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-notification-badge',
  styleUrl: './notification-badge.css',
  shadow: true,
})
export class NotificationBadge {
  /** (optional) Text that is displayed in the badge*/
  @Prop() label: string;
  @Prop() type: 'icon' | 'text' = 'icon';

  render() {
    return (
      <Host>
        <a class={this.getCssClassMap()}>
          <slot />
          <span class="notification-badge__circle">{this.label}</span>
        </a>
      </Host>
    );
  }
  getCssClassMap() {
    return classNames(
      `notification-badge`,
      this.label && `notification-badge--label`,
      this.type && `notification-badge--${this.type}`
    );
  }
}
