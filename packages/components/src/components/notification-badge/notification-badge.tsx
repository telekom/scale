import { Component, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-notification-badge',
  styleUrl: './notification-badge.css',
  shadow: true,
})
export class NotificationBadge {
  /** (optional) Text that is displayed in the badge*/
  @Prop() label: number;
  @Prop() maxCharacters: number = 3;
  @Prop() type: 'icon' | 'text' | 'nav-icon' = 'icon';

  getBadgeLabel() {
    if (this.label) {
      if (!isNaN(this.label)) {
        let labelNumber = '' + this.label;
        if (labelNumber.length > this.maxCharacters) {
          const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
          const tier = Math.floor(Math.log10(Number(this.label)) / 3) || 0;
          if (tier > 0) {
            const scaled = Number(this.label) / Math.pow(10, tier * 3);
            labelNumber = scaled.toFixed(1).replace('.0', '') + SI_SYMBOL[tier];
          }
        }
        return labelNumber;
      }
    }
  }

  getRender() {
    return (
      <div class={this.getCssClassMap()}>
        <a class="notfication-badge__wrapper">
          <slot />
          <span class="notfication-badge__circle">{this.getBadgeLabel()}</span>
        </a>
        <slot name="after-badge"></slot>
      </div>
    );
  }

  render() {
    return (
      <Host>
        {this.type !== 'nav-icon' ? (
          <div class="notification-badge-border" tabIndex={0}>
            {this.getRender()}
          </div>
        ) : (
          this.getRender()
        )}
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
