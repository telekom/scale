/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {
  Component,
  Prop,
  h,
  Host,
  Event,
  EventEmitter,
  Element,
} from '@stencil/core';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';
@Component({
  tag: 'scale-chip',
  styleUrl: './chip.css',
  shadow: true,
})
export class Chip {
  @Element() hostElement: HTMLElement;
  @Prop() type?: 'standard' | 'outline' = 'standard';
  /** (optional) */
  @Prop() selected?: boolean = false;
  /** (optional) chip aria-role */
  @Prop() ariaRoleTitle?: string = 'switch';
  /** (optional) chip aria-checked */
  @Prop() ariaCheckedState?: boolean;
  /** (optional) chip dismissible */
  @Prop() dismissible?: boolean = false;
  /** (optional) chip label */
  @Prop() label?: string;
  /** (optional) chip disabled */
  @Prop() disabled?: boolean = false;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  /** (optional) Change icon click event */
  @Event({ eventName: 'scale-change' }) scaleChange: EventEmitter<MouseEvent>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleChange' })
  scaleChangeLegacy: EventEmitter<MouseEvent>;
  /** (optional) Close icon click event */
  @Event({ eventName: 'scale-close' }) scaleClose: EventEmitter<MouseEvent>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleClose' })
  scaleCloseLegacy: EventEmitter<MouseEvent>;

  componentWillLoad() {
    // TODO other logic needed
    if (this.dismissible) {
      this.selected = true;
    }
  }
  componentDidRender() {
    // handle no setted icon size attribute
    const defaultIconSize = 24;
    const iconSlot = this.hostElement.querySelector(
      '[slot="chip-icon"]'
    ) as HTMLElement;
    if (iconSlot !== null) {
      if (
        iconSlot.children[0].getAttribute('size') === String(defaultIconSize)
      ) {
        iconSlot.children[0].setAttribute('size', String(16));
      }
    }
  }
  disconnectedCallback() {}

  handleClose = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled) {
      return;
    }
    emitEvent(this, 'scaleClose', event);
  };

  handleClick = (event: MouseEvent) => {
    this.selected = !this.selected;
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled) {
      return;
    }
    emitEvent(this, 'scaleChange', event);
  };

  getIcon() {
    if (this.dismissible) {
      return (
        <scale-icon-action-close
          accessibility-title="close"
          size={16}
          onClick={!this.disabled ? this.handleClose : null}
        />
      );
    } else if (!this.dismissible) {
      return (
        <scale-icon-action-success
          accessibility-title="success"
          size={16}
          selected
        />
      );
    }
  }

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <span
          role={this.ariaRoleTitle}
          aria-checked={
            this.ariaCheckedState ? this.ariaCheckedState : this.selected
          }
          tabindex={this.selected ? '0' : '-1'}
          part={this.getBasePartMap()}
          class={this.getCssClassMap()}
          onClick={
            !this.disabled && !this.dismissible ? this.handleClick : null
          }
        >
          <span class="chip-label">
            <slot />
          </span>
          {this.selected ? this.getIcon() : null}
        </span>
      </Host>
    );
  }

  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }

  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }

  getCssOrBasePartMap(mode: 'basePart' | 'css') {
    const component = 'chip';
    const prefix = mode === 'basePart' ? '' : `${component}--`;

    return classNames(
      mode === 'basePart' ? 'base' : component,
      !!this.selected && `${prefix}selected`,
      !!this.disabled && `${prefix}disabled`,
      !!this.dismissible && `${prefix}dismissible`,
      this.type && `${prefix}type-${this.type}`
    );
  }
}
