import { Component, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';
import { isNaN } from 'lodash';

@Component({
  tag: 'scale-notification-badge',
  styleUrl: './notification-badge.css',
  shadow: true,
})
export class NotificationBadge {
  /** (optional) Text that is displayed in the badge*/
  @Prop() label: string | number;
  @Prop() maxCharacters: number = 3;
  @Prop() type: 'icon' | 'text' = 'icon';

  getLabel() {
    if (this.label) {
      if (!isNaN(this.label)) {
        let labelNumber = String(this.label);
        if (labelNumber.length > this.maxCharacters) {
          labelNumber = labelNumber.substring(0, this.maxCharacters);
          labelNumber += '+';
        }
        return labelNumber;
      } else {
        let labelString = String(this.label);
        if (labelString.length > this.maxCharacters) {
          labelString = labelString.substring(0, this.maxCharacters);
          labelString += '...';
        }
        return labelString;
      }
    }
  }

  render() {
    return (
      <Host>
        <a class={this.getCssClassMap()}>
          <slot />
          <span class="notification-badge__circle">{this.getLabel()}</span>
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
