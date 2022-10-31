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
import { SetProp } from './grid.interfaces';
import {
  createCssString,
  createBreakpointValuedProp,
} from './valuesTransformation';

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
    const sizedProps: SetProp[] = [
      createBreakpointValuedProp('columns', this.columns),
      createBreakpointValuedProp('gutter-y', this.gutterY),
      createBreakpointValuedProp('gutter-x', this.gutterX),
      createBreakpointValuedProp('spacing', this.spacing),
    ].filter((sizeProp) => sizeProp);
    const sizableCssStrings: string[] = sizedProps.map((sizedProp: SetProp) =>
      createCssString(sizedProp)
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
