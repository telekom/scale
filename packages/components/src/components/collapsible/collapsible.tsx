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
  h,
  Prop,
  Host,
  Event,
  State,
  Element,
  EventEmitter,
} from '@stencil/core';
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
  headingElement: HTMLElement;
  headingId: string;
  panelId: string;

  @Element() el: HTMLElement;

  /** Set to `true` to expand */
  @Prop({ mutable: true, reflect: true }) expanded: boolean;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  /** Default aria-level for heading */
  @State() level: number = 2;

  /** Emitted so parent <scale-accordion> knows about it */
  @Event() scaleExpand: EventEmitter<CollapsibleEventDetail>;

  componentWillLoad() {
    const j = i++;
    this.headingId = 'collapsable-heading-' + j;
    this.panelId = 'collapsable-panel-' + j;
  }

  componentDidLoad() {
    this.setHeadingFromLightDOM();
  }

  /**
   * In this method we:
   * - query the first element from the light DOM, it should be a heading (e.g. h2)
   * - take its content and place it into our own heading element
   * - set aria-level to the level of that provided in the light DOM
   * - remove the original heading
   * @see https://inclusive-components.design/collapsible-sections/
   */
  setHeadingFromLightDOM() {
    const lightHeading = this.el.querySelector(':first-child');
    if (lightHeading == null) {
      return;
    }
    const level = parseInt(lightHeading.tagName.substr(1), 10);

    if (!level) {
      // tslint:disable-next-line
      console.warn(
        'The first element inside each <scale-collapsible> should be a heading of an appropriate level.'
      );
    }
    if (level !== this.level) {
      this.level = level;
    }
    this.headingElement.innerHTML = lightHeading.innerHTML;
    lightHeading.parentNode.removeChild(lightHeading);
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
            aria-level={this.level}
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
              <span
                ref={(el) => (this.headingElement = el)}
                part="button-text"
              />
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
