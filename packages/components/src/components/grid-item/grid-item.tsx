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
import { SizedProp } from '../grid/grid.interfaces';
import { createSizedProp, createCssString } from '../grid/sizesTransformation';

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
    const sizedProps: SizedProp[] = [
      createSizedProp('size', this.size),
      createSizedProp('offset', this.offset),
    ].filter((sizeProp) => sizeProp);
    const cssStrings: string[] = sizedProps.map((sizedProp: SizedProp) =>
      createCssString(sizedProp)
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
