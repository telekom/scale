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

import { Component, h, Prop } from '@stencil/core';
// import { findRootNode, findSelected } from '../../../utils/menu-utils';
// import { renderIcon } from '../../../utils/render-icon';

const readData = (data) => {
  let parsedData;

  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    parsedData = data;
  }

  return parsedData;
};

@Component({
  tag: 'scale-telekom-footer-data-back-compat',
  shadow: false,
})
export class TelekomFooterDataBackCompat {
  @Prop({ reflect: true }) type: 'standard' | 'minimal' = 'standard';
  @Prop() footerNavigation?: any = [];
  @Prop() copyright?: string = '© Deutsche Telekom AG';

  render() {
    return (
      <scale-telekom-footer type={this.type}>
        <scale-telekom-footer-content>
          <span slot="notice"> {this.copyright} </span>
          <ul slot="navigation">
            {readData(this.footerNavigation).map(
              ({
                name,
                id,
                href = 'javascript:void(0);',
                target = '_self',
              }) => {
                return (
                  <li>
                    <a href={href} id={id} target={target}>
                      {name}
                    </a>
                  </li>
                );
              }
            )}
          </ul>
        </scale-telekom-footer-content>
      </scale-telekom-footer>
    );
  }
}
