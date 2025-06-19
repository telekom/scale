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
  Element,
  Component,
  h,
  Prop,
  Host,
  Listen,
  Watch,
} from '@stencil/core';
import classnames from 'classnames';
@Component({
  tag: 'scale-accordion',
  shadow: true,
})
export class Accordion {
  @Element() el: HTMLElement;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  /** If `true`, only one scale-collapsible within the accordion can be open at a time */
  @Prop() dependent: boolean = false;
  /** If `true`, scale-collapsibles within the accordion will all be open initially, unless this is dependant */
  @Prop() expanded: boolean = false;
  /** Heading level for scale-collapsible descendants */
  @Prop() headingLevel: number | null = null;
  @Prop() iconLocation?: 'left' | 'right' = 'left';

  /**
   * Handle `dependent`
   */
  @Listen('scale-expand')
  collapsibleHandler(event: CustomEvent) {
    event.stopPropagation();
    const { expanded } = event.detail;
    if (!this.dependent || expanded === false) {
      return;
    }
    this.getCollapsibleChildren().forEach((child) => {
      if (child !== event.target && child.hasAttribute('expanded')) {
        child.expanded = false;
      }
    });
  }

  @Watch('headingLevel')
  headingLevelChanged(newValue: number | null) {
    this.propagatePropsToChildren(newValue, this.iconLocation);
  }

  @Watch('iconLocation')
  iconLocationChanged(newValue: 'left' | 'right') {
    this.propagatePropsToChildren(this.headingLevel, newValue);
  }

  connectedCallback() {
    /**
     * Handle `expanded`
     */
    if (this.expanded && !this.dependent) {
      this.getCollapsibleChildren().forEach((child) => {
        child.expanded = this.expanded;
      });
    }
  }

  componentDidLoad() {
    if (this.headingLevel !== null || this.iconLocation !== 'left') {
      this.propagatePropsToChildren(this.headingLevel, this.iconLocation);
    }
  }

  getCollapsibleChildren(): HTMLScaleCollapsibleElement[] {
    return Array.from(this.el.children).filter(
      (el) => el.tagName === 'SCALE-COLLAPSIBLE'
    ) as HTMLScaleCollapsibleElement[];
  }

  propagatePropsToChildren(
    headingLevel: number,
    iconLocation: 'left' | 'right'
  ) {
    this.getCollapsibleChildren().forEach((item) => {
      item.headingLevel = headingLevel;
      item.iconLocation = iconLocation;
    });
  }

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}

        <div class={this.getCssClassMap()} part="base">
          <slot />
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return classnames('accordion');
  }
}
