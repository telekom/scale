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

import { Component, h, Host, Prop, Event, Element } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { emitEvent } from '../../../utils/utils';

// TODO I wonder if we need the `mobile-` prefix for the slots if this is a different component from `telekom-header`
// TODO try and find a better name for mobile-bottom slot?

@Component({
  tag: 'scale-telekom-mobile-flyout-canvas',
  styleUrl: 'telekom-mobile-flyout-canvas.css',
  shadow: true,
})
export class TelekomMobileFlyoutCanvas {
  @Element() hostElement: HTMLStencilElement;

  @Prop() appName?: string;
  @Prop() appNameLink?: string;
  @Prop() appNameClick?: any;
  @Prop() closeButtonLabel?: string = 'Close';
  @Prop() closeButtonTitle?: string | null = null;

  @Event({ eventName: 'scale-close-nav-flyout' }) scaleCloseNavFlyout;

  render() {
    return (
      <Host>
        <div part="base">
          <div part="header">
            <slot name="heading">
              <h2 part="heading">{this.appName}</h2>
            </slot>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                emitEvent(this, 'scaleCloseNavFlyout', { originalEvent: event });
              }}
              title={this.closeButtonTitle}
              aria-label={this.closeButtonLabel}
              style={{ border: "1px solid green"}}
            >
              <slot name="close-icon">
                <scale-icon-action-close decorative />
              </slot>
            </a>
          </div>
          <div part="body">
            <slot name="row">
              <slot name="mobile-before-main-nav"></slot>
              <slot name="mobile-main-nav"></slot>
              <slot name="mobile-after-main-nav"></slot>
              <div part="meta">
                <div>
                  <slot name="mobile-meta-nav-external"></slot>
                  <slot name="mobile-meta-nav"></slot>
                </div>
                <div>
                  <slot name="mobile-lang-switcher"></slot>
                </div>
              </div>
              <slot name="mobile-bottom"></slot>
            </slot>
          </div>
        </div>
      </Host>
    );
  }
}
