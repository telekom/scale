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

import { Component, h, Prop, Host, Element, Watch } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-sidebar-nav-collapsible',
  styleUrl: 'sidebar-nav-collapsible.css',
  shadow: true,
})
export class SidebarNavCollapsible {
  @Element() el: HTMLElement;

  /** The parent wrapper */
  @Prop() tag?: string = 'li';
  /** The text for the button */
  @Prop() label: string;
  /** The URL where the link should point to */
  @Prop() href: string = '#';
  /** Set this to `true` to expand */
  @Prop({ mutable: true, reflect: true }) expanded: boolean;
  /** Label and icon get the active color */
  @Prop() active?: boolean = false;
  /** Bold label and icon */
  @Prop() bold: boolean = false;
  /** Used normally for third level items */
  @Prop() condensed: boolean = false;
  /** Nesting level within the <scale-sidebar-nav> parent, gets set automatically */
  @Prop() nestingLevel: number;
  /** (optional) Extra styles */
  @Prop() styles?: string;

  @Watch('nestingLevel')
  nestingLevelChanged(newValue: number) {
    if (newValue === 1) {
      this.bold = true;
    }
  }

  handleClick = (event: MouseEvent) => {
    event.preventDefault();
    this.expanded = !this.expanded;
  };

  /**
   * Simulate a <button> allowing using the Space key for toggling the menu.
   */
  handleKeydown = (event: KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey) {
      return;
    }
    if (event.defaultPrevented) {
      return;
    }
    if (event.code === 'Space') {
      this.expanded = !this.expanded;
    }
  };

  render() {
    const Tag = this.tag;

    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <Tag
          part={this.getBasePartMap()}
          class={this.getCssClassMap()}
          role="listitem"
        >
          <div class="sidebar-nav-collapsible__wrapper" part="wrapper">
            <a
              href={this.href}
              class="sidebar-nav-collapsible__button"
              onClick={this.handleClick}
              onKeyDown={this.handleKeydown}
              role="button"
              aria-expanded={this.expanded ? 'true' : 'false'}
              part={classNames('button', this.active && 'button-active')}
            >
              {this.label}
              <scale-icon-navigation-collapse-down
                class="sidebar-nav-collapsible__icon"
                selected={this.bold}
                size={20}
                part="icon"
              />
            </a>
          </div>
          <ul
            hidden={!this.expanded}
            class="sidebar-nav-collapsible__list"
            part="list"
          >
            <slot />
          </ul>
        </Tag>
      </Host>
    );
  }

  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }

  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }

  getCssOrBasePartMap(mode: 'basePart' | 'css') {
    const component = 'sidebar-nav-collapsible';
    const prefix = mode === 'basePart' ? '' : `${component}--`;

    return classNames(
      component,
      this.condensed && `${prefix}condensed`,
      this.active && `${prefix}active`
    );
  }
}
