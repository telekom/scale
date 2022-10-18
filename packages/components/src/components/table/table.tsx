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

import { Component, Prop, h, Element, Host } from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';

@Component({
  tag: 'scale-table',
  styleUrl: './table.css',
  shadow: false,
})
export class Table {
  @Element() hostElement: HTMLElement;
  /** (optional) Display sort arrows on/off */
  @Prop() showSort?: boolean = false;
  /** @deprecated - css overwrite should replace size */
  @Prop() size?: string;
  /** (optional) Striped Table */
  @Prop() striped?: boolean = false;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  /** object of the slots in use */
  slots: { header?: Element; table?: Element } = {};

  componentWillLoad() {
    this.hostElement.querySelectorAll('th').forEach((th) => {
      th.insertAdjacentHTML(
        'afterbegin',
        `
          <span class="scale-sort-indicator" aria-hidden="true">
            <svg viewBox="0 0 16 16">
             <polygon transform="translate(8.242641, 10.242641) rotate(45.000000) translate(-8.242641, -10.242641) " points="5.24264069 7.24264069 11.2426407 7.24264069 5.24264069 13.2426407"/></polygon>
             <polygon transform="translate(8.242641, 6.242641) scale(1, -1) rotate(45.000000) translate(-8.242641, -6.242641) " points="5.24264069 3.24264069 11.2426407 3.24264069 5.24264069 9.24264069"/>
            </svg>
          </span>`
      );
    });
  }

  componentDidLoad() {
    const table = this.hostElement;
    const progressbar = table.querySelectorAll('scale-progress-bar')
    if (progressbar) {
      progressbar.forEach(el => {
        el.showStatus = false;
      })
    }
  }

  componentDidRender() {
    if (this.size) {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "size" is deprecated. Please use css overwrites for a small version!',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }

  render() {
    return (
      <Host class={this.getCssClassMap()}>
        {this.styles && <style>{this.styles}</style>}
        <slot />
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'table',
      this.showSort && 'table--sortable',
      this.striped && 'table--striped'
    );
  }
}
