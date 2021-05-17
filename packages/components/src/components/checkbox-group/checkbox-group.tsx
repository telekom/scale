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
  initialLoad: boolean = true;
  statusChanged: boolean = false;
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

    if (this.initialLoad) {
      this.handleMasterCheckBoxState(newState);
      this.initialLoad = false;
      this.statusChanged = true;
    } else if (this.initialLoad == false) {
      this.handleMasterCheckBoxState(newState);
      this.statusChanged = true;
    }
    this.groupStatus = newState;
  }

  handleMasterCheckBoxState(newState: CheckboxState[]) {
    let checkedCounter = 0;
    for (let i = 1; i < newState.length; i++) {
      if (newState[i].checked) {
        checkedCounter += 1;
      }
    }
    let masterCheckbox;
    masterCheckbox = this.hostElement.querySelectorAll('scale-checkbox');
    //indeterminate
    if (checkedCounter < newState.length - 1 && checkedCounter != 0) {
      masterCheckbox[0].setAttribute('indeterminate', 'true');
      masterCheckbox[0].removeAttribute('checked');
      this.setMasterChanges();
    }
    //empty
    else if (checkedCounter == 0) {
      masterCheckbox[0].removeAttribute('indeterminate');
      masterCheckbox[0].removeAttribute('checked');
      this.setMasterChanges();
    }
    //checked
    else if (checkedCounter == newState.length - 1) {
      masterCheckbox[0].setAttribute('checked', 'true');
      masterCheckbox[0].removeAttribute('indeterminate');
      this.setMasterChanges();
    }
  }

  setMasterChanges() {
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
    this.groupStatus = newState;
    for (let i = 0; i < newState.length; i++) {
      console.log(newState[i]);
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
