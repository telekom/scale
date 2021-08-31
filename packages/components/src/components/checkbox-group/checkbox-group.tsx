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

import { Component, h, Host, Listen, Element } from '@stencil/core';
import { CheckboxInterface } from '../checkbox/checkbox';

@Component({
  tag: 'scale-checkbox-group',
  styleUrl: './checkbox-group.css',
  shadow: true,
})
export class CheckboxGroup {
  @Element() host: HTMLElement;

  @Listen('scaleChange')
  handleCheckboxChange(ev) {
    const { slot, tagName, checked } = ev.composedPath()[0];

    if (tagName.toLowerCase() === 'scale-checkbox') {
      if (slot === 'group-item') {
        this.updateParentCheckboxState();
      } else {
        this.updateChildrenCheckboxStates(checked);
        this.updateParentCheckboxState();
      }
    }
  }

  getParentNode() {
    return this.host.querySelector(
      'scale-checkbox:not([slot])'
    ) as CheckboxInterface;
  }

  getChildNodes() {
    return Array.from(
      this.host.querySelectorAll('scale-checkbox[slot="group-item"]')
    ) as CheckboxInterface[];
  }

  updateChildrenCheckboxStates(checked) {
    const childNodes = this.getChildNodes().filter((node) => !node.disabled);

    childNodes.forEach((node) => {
      // TODO: discuss the logic for setting disabled
      // node.disabled = disabled;

      if (checked !== undefined) {
        node.checked = checked;
        node.indeterminate = false;
      }
    });
  }

  updateParentCheckboxState() {
    const node = this.getParentNode();
    const childNodes = this.getChildNodes();

    const checked = childNodes?.map((childNode) => childNode.checked);
    const indeterminate = childNodes?.map(
      (childNode) => childNode.indeterminate
    );

    const allChecked = checked.every(Boolean);
    const someChecked = checked.some(Boolean);

    const someIndeterminate = indeterminate.some(Boolean);

    node.checked = allChecked || someChecked;
    node.indeterminate = someIndeterminate || (someChecked && !allChecked);
  }

  connectedCallback() {
    this.updateParentCheckboxState();
    // this.updateChildrenCheckboxStates(undefined, this.getParentNode().disabled);
  }

  render() {
    return (
      <Host>
        <div class="checkbox-group">
          <div class="checkbox-group__label">
            <slot />
          </div>
          <div class="checkbox-group__container">
            <slot name="group-item" />
          </div>
        </div>
      </Host>
    );
  }
}
