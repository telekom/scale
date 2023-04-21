import { Component, Element, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

import { emitEvent } from '../../utils/utils';

@Component({
  tag: 'scale-search-list-item',
  styleUrl: 'search-list-item.css',
  shadow: true,
})
export class SearchSelectItem {
  @Element() hostElement: HTMLElement;

  /** (optional) is close button to be shown */
  @Prop() dismissible?: boolean = true;

  /** (optional) The buttons to be shown on Hover or always */
  @Prop() variant?: 'always' | 'hover' = 'hover';

  /**
   * Handles click event for close button.
   * @param event click event
   */
  handleClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    emitEvent(this, 'scaleClose', event);
  };

  /**
   * Gets clear button.
   * @returns clear icon button.
   */
  getClearIconButton() {
    return (
      <scale-icon-button
        size="medium"
        part="clear-icon-button"
        onClick={this.handleClick}
      >
        <scale-icon-action-close
          part="clear-icon"
          accessibility-title="close"
          size={24}
        />
      </scale-icon-button>
    );
  }

  render() {
    return (
      <Host>
        <div part="base" tabIndex={0} class={this.getCssClassMap()}>
          <div part="prefix">
            <slot name="prefix"></slot>
          </div>

          <div part="text">
            <div part="label">
              <slot></slot>
            </div>
            <div part="supporting-text">
              <slot name="supporting-text"></slot>
            </div>
          </div>

          <div
            part="suffix"
            // style={{ display: `${this.variant === 'always' ? '' : 'none'}` }}
            // class={this.getCssClassMap()}
          >
            {this.dismissible ? (
              this.getClearIconButton()
            ) : (
              <slot name="suffix"></slot>
            )}
          </div>
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    const component = 'scale-search-list-item';

    return classNames(`${component}-${this.variant}`);
  }
}
