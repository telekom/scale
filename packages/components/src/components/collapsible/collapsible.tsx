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

import { Component, h, Prop, Host, Event, EventEmitter } from '@stencil/core';
import classNames from 'classnames';

export interface CollapsibleEventDetail {
  expanded: boolean;
}

let i = 0;

@Component({
  tag: 'scale-collapsible',
  styleUrl: './collapsible.css',
  shadow: true,
})
export class Collapsible {
  headingId: string;
  panelId: string;

  /** Set to `true` to expand */
  @Prop({ mutable: true, reflect: true }) expanded: boolean;
  /** Default aria-level for heading */
  @Prop() headingLevel: number = 2;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  /** Emitted so parent <scale-accordion> knows about it */
  @Event() scaleExpand: EventEmitter<CollapsibleEventDetail>;

  componentWillLoad() {
    const j = i++;
    this.headingId = 'collapsable-heading-' + j;
    this.panelId = 'collapsable-panel-' + j;
  }

  handleClick = () => {
    this.expanded = !this.expanded;
    this.scaleExpand.emit({ expanded: this.expanded });
  };

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}

        <div
          class={this.getCssClassMap()}
          part={classNames('base', this.expanded && 'expanded')}
        >
          <h2
            aria-level={this.headingLevel}
            class="collapsible__heading"
            part="heading"
          >
            <button
              id={this.headingId}
              class="collapsible__button"
              part="button"
              onClick={this.handleClick}
              aria-expanded={this.expanded ? 'true' : 'false'}
              aria-controls={this.panelId}
            >
              <scale-icon-navigation-collapse-down
                size={16}
                decorative
                class="collapsible__icon"
                part={classNames('icon', this.expanded && 'expanded')}
              />
              <span class="collapsible__button-text" part="button-text">
                <slot name="heading"></slot>
              </span>
            </button>
          </h2>
          <div
            id={this.panelId}
            role="region"
            aria-labelledby={this.headingId}
            hidden={!this.expanded}
            class="collapsible__content"
            part="content"
          >
            <slot />
          </div>
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames('collapsible', this.expanded && 'collapsible--expanded');
  }
}
