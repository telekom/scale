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

import { Component, Prop, h, Element, Host, State } from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';

@Component({
  tag: 'scale-table',
  styleUrl: './table.css',
  shadow: false,
})
export class Table {
  mutationObserver: MutationObserver;

  @Element() hostElement: HTMLElement;
  /** (optional) Display sort arrows on/off */
  @Prop() showSort?: boolean = false;
  /** @deprecated - css overwrite should replace size */
  @Prop() size?: string;
  /** (optional) Striped Table */
  @Prop() striped?: boolean = false;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  /** "forceUpdate" hack, set it to trigger and re-render */
  @State() forceUpdate: string;
  /** object of the slots in use */
  slots: { header?: Element; table?: Element } = {};

  addSortIndicator(el) {
    el.insertAdjacentHTML(
      'afterbegin',
      `
        <span class="scale-sort-indicator" aria-hidden="true">
          <scale-icon-content-sort-indicator-up class="scale-sort-indicator-icon up" size="16"></scale-icon-content-sort-indicator-up>
          <scale-icon-content-sort-indicator-down class="scale-sort-indicator-icon down" size="16"></scale-icon-content-sort-indicator-down>
        </span>`
    );
  }

  componentWillLoad() {
    if (this.showSort) {
      this.hostElement.querySelectorAll('th').forEach((th) => {
        this.addSortIndicator(th);
      });
    }
  }

  componentWillUpdate() {
    this.hostElement.querySelectorAll('th').forEach((th) => {
      // only cols that are NOT added dynamically have children (the sorting icon), added on componentWillLoad
      if (th.children.length === 0) {
        // this may not be needed
        th.classList.add('dynamically-added');
        if (this.showSort) {
          this.addSortIndicator(th);
        }
      }
    });
  }

  componentDidLoad() {
    const table = this.hostElement;
    const progressbar = table.querySelectorAll('scale-progress-bar');
    if (progressbar) {
      progressbar.forEach((el) => {
        el.showStatus = false;
      });
    }
    this.mutationObserver = new MutationObserver(() => {
      this.forceUpdate = String(Date.now());
    });
    this.mutationObserver.observe(this.hostElement, {
      childList: true,
      subtree: true,
    });
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

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
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
