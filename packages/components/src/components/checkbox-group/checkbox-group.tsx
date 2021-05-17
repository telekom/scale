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

import { Component, h, Host, Listen, Element, State } from '@stencil/core';
import { CheckboxState } from './utils/utils';

@Component({
  tag: 'scale-checkbox-group',
  styleUrl: './checkbox-group.css',
  shadow: true,
})
export class CheckboxGroup {
  initialLoad = false;
  masterIndeterminate = false;
  @State() groupStatus: CheckboxState[] = [];
  @Element() hostElement: HTMLElement;
  @Listen('scaleChange')
  scaleChangeHandler() {
    this.setGroupStatusState();
  }

  componentDidLoad() {
    this.setGroupStatusState();
  }

  setGroupStatusState() {
    const checkboxes = Array.from(
      this.hostElement.querySelectorAll('scale-checkbox')
    );
    const newState: CheckboxState[] = [];
    for (let i = 0; i < checkboxes.length; i++) {
      newState[i] = {
        id: checkboxes[i].inputId,
        checked: checkboxes[i].checked,
        disabled: checkboxes[i].disabled ? checkboxes[i].disabled : false,
        indeterminate: checkboxes[i].indeterminate,
      };
    }
    console.log(newState);
    this.handleMasterCheckBox(newState);
    this.groupStatus = newState;
  }
  handleMasterCheckBox(newState: CheckboxState[]) {
    let checkedCounter = 0;
    for (let i = 1; i < newState.length; i++) {
      console.log(newState[i]);
      if (newState[i].checked) {
        checkedCounter += 1;
      }
    }
    let masterCheckbox;
    //indeterminate
    console.log('CC' + checkedCounter);
    console.log(newState.length);
    if (checkedCounter < newState.length - 1 && checkedCounter != 0) {
      masterCheckbox = this.hostElement.querySelectorAll('scale-checkbox');
      masterCheckbox[0].setAttribute('indeterminate', 'true');
      masterCheckbox[0].removeAttribute('checked');
      console.log('1');
      //empty
    } else if (checkedCounter == 0) {
      masterCheckbox = this.hostElement.querySelectorAll('scale-checkbox');
      masterCheckbox[0].removeAttribute('indeterminate');
      masterCheckbox[0].removeAttribute('checked');
      console.log('2');
      //checked
    } else if (checkedCounter == newState.length - 1) {
      masterCheckbox = this.hostElement.querySelectorAll('scale-checkbox');
      masterCheckbox[0].setAttribute('checked', 'true');
      masterCheckbox[0].removeAttribute('indeterminate');
      console.log('3');
    }
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
