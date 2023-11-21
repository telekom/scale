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
  /** @deprecated - no more size difference */
  @Prop() small?: boolean = false;
  /** (optional) size  */
  /** @deprecated  - no more size difference */
  @Prop() size: 'small' | 'large' = 'small';
  /** (optional) adds tab-index="0" to the panel, set to false to exclude the tab-panel from the tab sequence, e.g. if the first element in the panel is a focusable button */
  @Prop() tabbablePanel?: boolean = true;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  componentDidRender() {
    if (this.small !== false) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "small" is deprecated.',
        type: 'warn',
        source: this.el,
      });
    }
  }

  setTabIndex() {
    if (this.tabbablePanel === true) {
      return { tabindex: '0' };
    }
  }

  render() {
    return (
      <Host
        id={`scale-tab-panel-${this.generatedId}`}
        role="tabpanel"
        {...this.setTabIndex()}
      >
        {this.styles && <style>{this.styles}</style>}
        <div part="tab-panel" class="tab-panel">
          <slot />
        </div>
      </Host>
    );
  }
}
