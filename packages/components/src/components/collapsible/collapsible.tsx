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

import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
} from '@stencil/core';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';

export interface CollapsibleEventDetail {
  expanded: boolean;
}

const DEFAULT_ICON_SIZE = 24;

let i = 0;

@Component({
  tag: 'scale-collapsible',
  styleUrl: './collapsible.css',
  shadow: true,
})
export class Collapsible {
  headingId: string;
  panelId: string;
  headingElement: HTMLElement;

  @Element() hostElement: HTMLElement;

  /** Set to `true` to expand */
  @Prop({ mutable: true, reflect: true }) expanded: boolean;
  /** Default aria-level for heading */
  @Prop() headingLevel: number = 2;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  @Prop() iconLocation?: 'left' | 'right' = 'left';

  /** Emitted so parent <scale-accordion> knows about it */
  @Event({ eventName: 'scale-expand' })
  scaleExpand: EventEmitter<CollapsibleEventDetail>;

  componentWillLoad() {
    const j = i++;
    this.headingId = 'collapsable-heading-' + j;
    this.panelId = 'collapsable-panel-' + j;
  }

  componentDidLoad() {
    this.setHeadingFromLightDOM();
  }

  handleClick = () => {
    this.expanded = !this.expanded;
    emitEvent(this, 'scale-expand', { expanded: this.expanded });
  };

  /**
   * @deprecated Safe to remove in 4.0
   * @see https://github.com/telekom/scale/pull/319
   */
  setHeadingFromLightDOM() {
    const lightHeading: HTMLElement =
      this.hostElement.querySelector(':first-child');
    if (lightHeading == null) {
      return;
    }
    // Only proceed if the element is not a heading and has no `slot` attribute
    const isHeading = lightHeading.tagName.charAt(0).toUpperCase() === 'H';
    const hasSlotAttr = lightHeading.hasAttribute('slot');
    if (isHeading && !hasSlotAttr) {
      this.headingElement.innerHTML = lightHeading.innerHTML;
      lightHeading.style.display = 'none';
    }
  }

  render() {
    const IconTag = this.expanded
      ? 'scale-icon-navigation-collapse-down'
      : 'scale-icon-navigation-right';
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
              {this.iconLocation === 'left' ? (
                <IconTag
                  size={DEFAULT_ICON_SIZE}
                  decorative
                  class="collapsible__icon"
                  part={classNames('icon', this.expanded && 'expanded')}
                />
              ) : null}
              <span
                ref={(el) => (this.headingElement = el)}
                class="collapsible__button-text"
                part="button-text"
              >
                <slot name="heading"></slot>
              </span>
              {this.iconLocation === 'right' ? (
                <IconTag
                  size={DEFAULT_ICON_SIZE}
                  decorative
                  class="collapsible__icon collapsible__icon-right"
                  part={classNames('icon', this.expanded && 'expanded')}
                />
              ) : null}
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
