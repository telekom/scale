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

    //initial Loading
    if (this.initialLoad) {
      this.handleMasterCheckBoxState(newState);
      this.initialLoad = false;
      this.statusChanged = true;
    }
    //not initial Loading
    else if (this.initialLoad == false) {
      //if master have been changed
      if (this.checkForSubChange(newState)) {
        this.handleMasterCheckBoxState(newState);
      } else {
        this.checkForMasterChange(newState);
      }
    }
  }

  checkForMasterChange(newState: CheckboxState[]) {
    // set master to checked
    let checkboxes;
    checkboxes = this.hostElement.querySelectorAll('scale-checkbox');

    if (this.groupStatus[0].indeterminate || !this.groupStatus[0].checked) {
      for (let i = 1; i < checkboxes.length; i++) {
        if (!newState[i].disabled) {
          checkboxes[i].setAttribute('checked', 'true');
          checkboxes[i].removeAttribute('indeterminate');
        }
      }
      this.setMasterChanges();
    }
    // set master to empty
    else if (this.groupStatus[0].checked) {
      for (let i = 1; i < checkboxes.length; i++) {
        if (!newState[i].disabled) {
          checkboxes[i].removeAttribute('checked');
          checkboxes[i].removeAttribute('indeterminate');
        }
      }
      this.setMasterChanges();
    }
  }

  checkForSubChange(newState: CheckboxState[]) {
    let checkedCounterOldState = 0;
    for (let i = 1; i < this.groupStatus.length; i++) {
      if (this.groupStatus[i].checked) {
        checkedCounterOldState += 1;
      }
    }
    let checkedCounterNewState = 0;
    for (let i = 1; i < newState.length; i++) {
      if (newState[i].checked) {
        checkedCounterNewState += 1;
      }
    }
    if (
      checkedCounterNewState == checkedCounterOldState - 1 ||
      checkedCounterNewState == checkedCounterOldState + 1 ||
      checkedCounterNewState ==
        checkedCounterOldState - this.groupStatus.length - 2 ||
      checkedCounterNewState ==
        checkedCounterOldState - this.groupStatus.length + 2
    ) {
      return true;
    }
  }

  handleMasterCheckBoxState(newState: CheckboxState[]) {
    let checkedCounter = 0;
    for (let i = 1; i < newState.length; i++) {
      if (newState[i].checked) {
        checkedCounter += 1;
      }
    }
    let disabledCounter = 0;
    for (let i = 1; i < newState.length; i++) {
      if (newState[i].disabled) {
        disabledCounter += 1;
      }
    }
    let checkboxes;
    checkboxes = this.hostElement.querySelectorAll('scale-checkbox');
    //indeterminate
    if (
      checkedCounter < newState.length - disabledCounter + 1 &&
      checkedCounter != 0
    ) {
      checkboxes[0].setAttribute('indeterminate', 'true');
      checkboxes[0].removeAttribute('checked');
      this.setMasterChanges();
    }
    //empty
    else if (checkedCounter == 0) {
      checkboxes[0].removeAttribute('indeterminate');
      checkboxes[0].removeAttribute('checked');
      this.setMasterChanges();
    }
    //checked
    if (checkedCounter + disabledCounter == newState.length - 1) {
      console.log('Klappt');
      checkboxes[0].setAttribute('checked', 'true');
      checkboxes[0].removeAttribute('indeterminate');
      this.setMasterChanges();
    }
  }

  setMasterChanges() {
    const checkboxes = Array.from(
      this.hostElement.querySelectorAll('scale-checkbox')
    );
    const changedState: CheckboxState[] = [];
    for (let i = 0; i < checkboxes.length; i++) {
      changedState[i] = {
        id: checkboxes[i].inputId,
        checked: checkboxes[i].checked,
        disabled: checkboxes[i].disabled ? checkboxes[i].disabled : false,
        indeterminate: checkboxes[i].indeterminate,
      };
    }
    this.groupStatus = changedState;
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
