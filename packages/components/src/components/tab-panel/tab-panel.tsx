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

import { Component, Element, h, Prop, Host } from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';

let i = 0;

@Component({
  tag: 'scale-tab-panel',
  styleUrl: './tab-panel.css',
  shadow: true,
})
export class TabPanel {
  generatedId: number = i++;

  @Element() el: HTMLElement;
  /** True for smaller height and font size */
  /** @deprecated - css overwrites should replace small */
  @Prop() small?: boolean = false;
  /** (optional) size  */
  @Prop() size: 'small' | 'large' = 'large';
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  componentDidRender() {
    if (this.small !== false) {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "small" is deprecated. Please use the css overwrites!',
        type: 'warn',
        source: this.el,
      });
    }
  }

  render() {
    return (
      <Host id={`scale-tab-panel-${this.generatedId}`} role="tabpanel">
        {this.styles && <style>{this.styles}</style>}

        <div part={this.getBasePartMap()} class={this.getCssClassMap()}>
          <slot />
        </div>
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
    const component = 'tab-panel';
    const prefix = mode === 'basePart' ? '' : `${component}--`;
    this.size === 'small' && `${prefix}small`;
    return classNames(component, `${prefix}`);
  }
}
