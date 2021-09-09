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
  Host,
  Listen,
  Element,
  State,
  Prop,
} from '@stencil/core';
import { CheckboxState, objDiffer } from './utils/utils';

@Component({
  tag: 'scale-checkbox-group',
  styleUrl: './checkbox-group.css',
  shadow: true,
})
export class CheckboxGroup {
  initialLoad: boolean = true;

  @Element() hostElement: HTMLElement;
  @Prop() unselect: String = 'unselect all';
  @Prop() select: String = 'select all';

  @State() groupStatus: CheckboxState[] = [];
  @State() groupLabel: String = '';

  @Listen('scaleChange')
  scaleChangeHandler() {
    this.createNewState();
  }

  componentDidLoad() {
    this.createNewState();
  }

  createNewState() {
    const checkboxes = Array.from(this.getCheckboxes());
    const newState: CheckboxState[] = [];
    for (let i = 0; i < checkboxes.length; i++) {
      newState[i] = {
        id: checkboxes[i].inputId,
        checked: checkboxes[i].checked,
        disabled: checkboxes[i].disabled ? checkboxes[i].disabled : false,
        indeterminate: checkboxes[i].indeterminate,
      };
    }
    this.groupLabel = checkboxes[0].label;
    this.distributeNewState(newState);
  }

  distributeNewState(newState: CheckboxState[]) {
    if (!newState[0].disabled) {
      // initial Loading
      if (this.initialLoad) {
        this.setMasterCheckBoxState(newState);
        this.initialLoad = false;
      }
      // not initial Loading
      else {
        // sub has been changed
        if (this.checkForSubCheckboxChange(newState)) {
          this.setMasterCheckBoxState(newState);
        }
        // master has been changed
        else {
          this.checkForMasterCheckboxChange(newState);
        }
      }
    } else {
      this.setMasterCheckBoxState(newState);
      this.handleMasterDisableProp();
    }
  }

  handleMasterDisableProp() {
    const checkboxes = this.getCheckboxes();
    // set all subs to disabled
    for (let i = 1; i < checkboxes.length; i++) {
      checkboxes[i].setAttribute('disabled', 'true');
    }
    this.setGroupStatusState();
  }

  checkForMasterCheckboxChange(newState: CheckboxState[]) {
    const checkboxes = this.getCheckboxes();
    // set master and subs to checked
    if (this.groupStatus[0].indeterminate || !this.groupStatus[0].checked) {
      for (let i = 1; i < checkboxes.length; i++) {
        if (!newState[i].disabled) {
          checkboxes[i].setAttribute('checked', 'true');
          checkboxes[i].removeAttribute('indeterminate');
        }
      }
      this.setGroupStatusState();
    }
    // set master and subs to empty if checked master has been clicked
    else {
      for (let i = 1; i < checkboxes.length; i++) {
        if (!newState[i].disabled) {
          checkboxes[i].removeAttribute('checked');
          checkboxes[i].removeAttribute('indeterminate');
        }
      }
      this.setGroupStatusState();
    }
  }

  checkForSubCheckboxChange(newState: CheckboxState[]) {
    // check, if old and new subs are equal
    const [, ...subOld] = this.groupStatus;
    const [, ...subNew] = newState;

    if (objDiffer(subOld, subNew)) {
      return true;
    }
  }

  setMasterCheckBoxState(newState: CheckboxState[]) {
    let checkedCounter = 0;
    let disabledCounter = 0;
    // check subs
    for (let i = 1; i < newState.length; i++) {
      if (!newState[i].disabled) {
        if (newState[i].checked) {
          checkedCounter += 1;
        }
      } else {
        disabledCounter += 1;
      }
    }
    const checkboxes = this.getCheckboxes();
    // set master to checked
    if (checkedCounter + disabledCounter === newState.length - 1) {
      checkboxes[0].setAttribute('checked', 'true');
      checkboxes[0].removeAttribute('indeterminate');
      this.setGroupStatusState();
    }
    // set master to indeterminate
    else if (
      checkedCounter + disabledCounter < newState.length &&
      checkedCounter !== 0
    ) {
      checkboxes[0].setAttribute('indeterminate', 'true');
      checkboxes[0].removeAttribute('checked');
      this.setGroupStatusState();
    }
    // set master to empty when no sub is checked
    else {
      checkboxes[0].removeAttribute('indeterminate');
      checkboxes[0].removeAttribute('checked');
      this.setGroupStatusState();
    }
  }

  setGroupAriaLabel() {
    const checkboxes = this.getCheckboxes();
    const label = this.groupLabel;

    if (checkboxes[0].checked) {
      checkboxes[0].setAttribute('labeloutput', label + ' ' + this.unselect);
    } else if (!checkboxes[0].checked) {
      checkboxes[0].setAttribute('labeloutput', label + ' ' + this.select);
    }
  }

  setGroupStatusState() {
    const checkboxes = Array.from(this.getCheckboxes());
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
    this.setGroupAriaLabel();
  }

  getCheckboxes() {
    return this.hostElement.querySelectorAll('scale-checkbox');
  }

  render() {
    return (
      <Host>
        <fieldset class="fieldset-wrapper">
          <div class="checkbox-group">
            <legend class="checkbox-group__label">
              <slot />
            </legend>
            <div class="checkbox-group__container">
              <slot name="group-item" />
            </div>
          </div>
        </fieldset>
      </Host>
    );
  }
}
