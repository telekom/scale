import { Component, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-noti-badge',
  styleUrl: './noti-badge.css',
  shadow: true,
})
export class NotificationBadge {
  /** (optional) Text that is displayed in the badge*/
  @Prop() label: number;
  @Prop() type: 'icon' | 'text' | 'nav-icon' = 'icon';

  render() {
    return (
      <Host>
        <a class={this.getCssClassMap()}>
          <slot />
          <span class="notfication-badge__circle">{this.label}</span>
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
