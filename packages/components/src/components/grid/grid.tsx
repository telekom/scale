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

import { Component, h, Host, Element, Prop } from '@stencil/core';
import { SizedProp } from './grid.interfaces';
import { createCssString, createSizedProp } from './sizesTransformation';

@Component({
  tag: 'scale-grid',
  shadow: false,
})
export class Grid {
  @Element() hostElement: HTMLElement;

  /** (optional) Set amount of columns in container */
  @Prop() columns?: string;

  /** (optional) Set gutter between columns */
  @Prop() gutterY?: string;

  /** (optioanl) Set gutter between rows */
  @Prop() gutterX?: string;

  /** (optioanl) Set padding to container */
  @Prop() spacing?: string;

  /** (optioanl) Set max-width to contaier */
  @Prop() maxWidth?: string;

  componentWillLoad() {
    const sizedProps: SizedProp[] = [
      createSizedProp('columns', this.columns),
      createSizedProp('gutter-y', this.gutterY),
      createSizedProp('gutter-x', this.gutterX),
      createSizedProp('spacing', this.spacing),
    ].filter((sizeProp) => sizeProp);
    const sizableCssStrings: string[] = sizedProps.map(
      (sizedProp: SizedProp) => createCssString(sizedProp)
    );
    const maxWidthCssStirng = this.maxWidth
      ? `--max-width:${this.maxWidth};`
      : '';
    const styleString = sizableCssStrings.join('') + maxWidthCssStirng;
    this.hostElement.setAttribute('style', styleString);
  }
  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
