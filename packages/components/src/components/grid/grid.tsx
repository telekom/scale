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

import { Component, h, Host, Element } from '@stencil/core';

@Component({
  tag: 'scale-grid',
  shadow: false,
})
export class Container {
  @Element() hostElement: HTMLElement;

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
