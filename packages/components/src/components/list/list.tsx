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

/**
 * @see https://github.com/carbon-design-system/carbon-web-components/tree/master/src/components/list
 */

@Component({
  tag: 'scale-list',
  styleUrl: './list.css',
  shadow: true,
})
export class List {
  isNested: boolean = false;

  @Element() el: HTMLElement;

  /** (optional) Make the list ordered (ol) */
  @Prop() ordered?: boolean = false;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  @Watch('ordered')
  orderedChanged(newValue) {
    this.propagatePropsToChildren(newValue);
  }

  componentDidLoad() {
    this.propagatePropsToChildren(this.ordered);
  }

  connectedCallback() {
    this.isNested = this.el.closest('scale-list-item') != null;

    if (this.isNested) {
      this.el.setAttribute('slot', 'nested');
    } else {
      this.el.removeAttribute('slot');
    }
  }

  propagatePropsToChildren(ordered: boolean) {
    const items = Array.from(this.el.children).filter((child) =>
      child.matches('scale-list-item')
    );
    (items as HTMLScaleListItemElement[]).forEach((item, index) => {
      item.ordered = ordered;
      item.index = index + 1;
    });
  }

  render() {
    const Tag = this.ordered ? 'ol' : 'ul';

    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}

        <Tag
          class={this.getCssClassMap()}
          part={classNames(
            'base',
            this.ordered && 'ordered',
            this.isNested && 'nested'
          )}
        >
          <slot />
        </Tag>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'list',
      this.ordered && 'list--type-ordered',
      this.isNested && 'list--nested'
    );
  }
}
