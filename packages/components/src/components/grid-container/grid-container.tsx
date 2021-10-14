/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Component, Prop, h, Host, /*Listen,*/ Element } from '@stencil/core';
import classNames from 'classnames';
// import { hasShadowDom } from '../../utils/utils';

@Component({
  tag: 'scale-grid-container',
  styleUrl: 'grid-container.css',
  shadow: false,
})
export class container {
  @Element() hostElement: HTMLElement;

  /** (optional) The size of container */
  @Prop() size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

  /** (optional) The amount of columns */
  @Prop() cols?: '1' | '2' |'3' | '5'| '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' 

  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

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
      'grid-container',
      this.size && `grid-container--size-${this.size}`,
      this.cols && `grid-container--cols-${this.cols}`,
    );
  }
}
