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

import { Component, Prop, h, Host, Element } from '@stencil/core';
import { SetProp } from '../grid/grid.interfaces';
import {
  createBreakpointValuedProp,
  createCssString,
} from '../grid/valuesTransformation';

@Component({
  tag: 'scale-grid-item',
  shadow: false,
})
export class GridItem {
  @Element() hostElement: HTMLElement;

  /** (optional) Set size of column */
  @Prop() size?: string;

  /** (optional) Set starting column */
  @Prop() offset?: string;

  componentWillLoad() {
    const setProps: SetProp[] = [
      createBreakpointValuedProp('size', this.size),
      createBreakpointValuedProp('offset', this.offset),
    ].filter((setProp) => setProp);
    const cssStrings: string[] = setProps.map((setProp: SetProp) =>
      createCssString(setProp)
    );
    this.hostElement.setAttribute('style', cssStrings.join(''));
  }
  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
