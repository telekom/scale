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
  Watch,
} from '@stencil/core';
import { objDiffer, CheckboxState } from './utils/utils';

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
    // console.log('scaleChangeHandler() called');
    this.setGroupStatusState();
  }

  @Watch('groupStatus')
  watchHandler(newValue: CheckboxState[], oldValue: CheckboxState[]) {
    // console.log('status watcher called');
    if (objDiffer(oldValue, newValue) || this.initialLoad) {
      /* console.log('objects differ, this.initialLoad = ', this.initialLoad);
		console.log('The old value of groupStatus is: ', oldValue);
		console.log('The new value of groupStatus is: ', newValue); */
      if (oldValue[0] || this.initialLoad) {
        // console.log('new vs old: ', newValue[0], oldValue[0]);
        this.initialLoad = false;
        this.adaptNewState(newValue, oldValue);
      }
      this.handleCheckboxGroupStatus();
      this.initialLoad = false;
    }
  }

  componentDidLoad() {
    this.initialLoad = true;
    this.setGroupStatusState();
  }

  setGroupStatusState() {
    // console.log('setGroupStatusState() started');
    const checkboxes = Array.from(
      this.hostElement.querySelectorAll('scale-checkbox')
    );
    const newState: CheckboxState[] = [];
    for (let i = 0; i < checkboxes.length; i++) {
      newState[i] = {
        id: checkboxes[i].inputId,
        checked: checkboxes[i].checked,
        disabled: checkboxes[i].disabled ? checkboxes[i].disabled : false,
      };
    }
    this.groupStatus = newState;
  }

  getGroupStatus(
    newState: CheckboxState[],
    tempState: any,
    count: number,
    masterChecked: boolean
  ) {
    let numberDisabled: number;
    numberDisabled + this.getCheckedDisabledCheckBoxes(newState).length;
    numberDisabled + this.getUnCheckedDisabledCheckBoxes(newState).length;
    for (let i = 0; i < newState.length; i++) {
      if (!newState[i].disabled) {
        newState[i].checked = masterChecked;
        tempState[i].checked = masterChecked;
        count += 1;
      }
      if (newState[i].disabled && newState[i].checked) {
        count += 1;
      }
    }
    if (count + numberDisabled < newState.length) {
      this.masterIndeterminate = true;
      if (masterChecked === true) {
        tempState[0].checked = false;
      }
      count = 0;
    }
    return tempState;
  }

  getCheckedDisabledCheckBoxes(newState: CheckboxState[]) {
    let disabledPositions = [];
    for (let i = 1; i < newState.length; i++) {
      if (newState[i].disabled && newState[i].checked === true) {
        disabledPositions.push(i);
      }
    }
    return disabledPositions;
  }
  getUnCheckedDisabledCheckBoxes(newState: CheckboxState[]) {
    let disabledPositions = [];
    for (let i = 1; i < newState.length; i++) {
      if (newState[i].disabled && !newState[i].checked === true) {
        disabledPositions.push(i);
      }
    }
    return disabledPositions;
  }

  adaptNewState(newState: CheckboxState[], oldState: CheckboxState[]) {
    // console.log(' adaptNewState() called');
    const tempState = [...newState];
    let countChecked = 0;
    let countUnchecked = 0;

    let disabledCheckedCount = this.getCheckedDisabledCheckBoxes(newState)
      .length;
    let disabledUnCheckedCount = this.getUnCheckedDisabledCheckBoxes(newState)
      .length;

    console.log(
      'count of disabled checked Checkboxes  ' + disabledCheckedCount
    );
    console.log(
      'count of disabled unChecked Checkboxes  ' + disabledUnCheckedCount
    );

    if (newState[0].disabled) {
      tempState.forEach((checkbox) => {
        checkbox.disabled = true;
      });
    }
    if (newState[0].checked !== oldState[0]?.checked) {
      const isMasterChecked = newState[0].checked;
      if (isMasterChecked) {
        // console.log('master is checked');

        this.groupStatus = this.getGroupStatus(
          newState,
          tempState,
          countChecked,
          true
        );
      } else {
        // console.log('master is not checked');
        // new master unchecked and maybe indeterminate
        this.groupStatus = this.getGroupStatus(
          newState,
          tempState,
          countUnchecked,
          false
        );
      }
    } else {
      // console.log('sub box has been clicked');
      // sub box has been clicked
      for (let i = 1; i < newState.length; i++) {
        tempState[i].checked = newState[i].checked;
        if (newState[i].checked) {
          countChecked += 1;
        } else {
          countUnchecked += 1;
        }
      }
      if (countChecked + disabledUnCheckedCount === newState.length - 1) {
        console.log('Case 1');
        tempState[0].checked = true;
        this.masterIndeterminate = false;
      } else if (
        countUnchecked + disabledCheckedCount ===
        newState.length - 1
      ) {
        console.log('Case 2');
        tempState[0].checked = false;
        this.masterIndeterminate = false;
      } else {
        console.log('Case 3');
        tempState[0].checked = false;
        this.masterIndeterminate = true;
      }
      this.groupStatus = tempState;
      countUnchecked = 0;
      countChecked = 0;
    }
  }

  handleCheckboxGroupStatus() {
    // console.log('handleCheckboxGroupStatus() started');
    const checkboxes = Array.from(
      this.hostElement.querySelectorAll('scale-checkbox')
    );

    for (let i = 0; i < checkboxes.length; i++) {
      if (i === 0) {
        if (this.masterIndeterminate) {
          console.log('this.masterIndeterminate === true');
          checkboxes[0].setAttribute('indeterminate', 'true');
          checkboxes[0].checked = false;
          this.masterIndeterminate = false;
        } else {
          console.log('this.masterIndeterminate === false');
          checkboxes[0].removeAttribute('indeterminate');
          checkboxes[0].checked = this.groupStatus[0].checked;
        }
      } else {
        checkboxes[i].checked = this.groupStatus[i].checked;
        checkboxes[i].disabled = this.groupStatus[i].disabled;
      }
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
