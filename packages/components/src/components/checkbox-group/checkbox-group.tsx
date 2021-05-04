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

@Component({
  tag: 'scale-checkbox-group',
  styleUrl: './checkbox-group.css',
  shadow: true,
})
export class CheckboxGroup {
  @Element() hostElement: HTMLElement;
  @Listen('scaleChange')
  scaleChangeHandler(event: CustomEvent<any>) {
    this.handleCheckboxChange(event);
  }

  componentDidLoad() {
    this.handleCheckboxGroupStatus();
  }

  handleCheckboxChange(event: CustomEvent<any>) {
    this.handleCheckboxGroupStatus(event);
  }

  handleCheckboxGroupStatus(event?: CustomEvent<any>) {
    const checkboxes = Array.from(
      this.hostElement.querySelectorAll('scale-checkbox')
    );
    const labelBox = checkboxes[0];
	const labelBoxInputId = labelBox.inputId;
    let countChecked = 0;
    let countUnchecked = 0;
    if (event) {
      if (event.detail.id === labelBoxInputId) {
        const checked = labelBox.checked;
        labelBox.removeAttribute('indeterminate');
        checkboxes.forEach((checkbox) => {
          checkbox.checked = checked;
          if (checked) {
            labelBox.setAttribute('checked', 'true');
          } else {
            labelBox.removeAttribute('checked');
          }
        });
        return;
      }
    } else {
      if (labelBox.checked) {
        labelBox.removeAttribute('indeterminate');
        labelBox.setAttribute('checked', 'true');
        checkboxes.forEach((checkbox) => {
          checkbox.checked = true;
        });
        return;
      }
    }
    for (let i = 1; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        countChecked += 1;
      } else {
        countUnchecked += 1;
      }
    }
    if (countChecked === checkboxes.length - 1) {
      labelBox.removeAttribute('indeterminate');
      labelBox.checked = true;
      return;
    }
    if (countUnchecked === checkboxes.length - 1) {
      labelBox.removeAttribute('indeterminate');
      labelBox.checked = false;
      return;
    }
    labelBox.setAttribute('indeterminate', 'true');
    labelBox.removeAttribute('checked');
  }

  render() {
    return (
      <Host>
        <div class="checkbox-group">
          <div class="checkbox-group__label">
            <slot name="checkbox-header" />
          </div>
          <div class="checkbox-group__container">
            <slot name="checkbox-list" />
          </div>
        </div>
      </Host>
    );
  }
}
