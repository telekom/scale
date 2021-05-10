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
    this.setGroupStatusState();
  }

  @Watch('groupStatus')
  watchHandler(newValue: CheckboxState[], oldValue: CheckboxState[]) {
    if (objDiffer(oldValue, newValue) || this.initialLoad) {
      if (oldValue[0] || this.initialLoad) {
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
    numberDisabled + this.getDisabledCheckBoxes(newState, true).length;
    numberDisabled + this.getDisabledCheckBoxes(newState, false).length;
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

  getDisabledCheckBoxes(newState: CheckboxState[], checked: boolean) {
    let disabledPositions = [];
    for (let i = 1; i < newState.length; i++) {
      if (newState[i].disabled && newState[i].checked === checked) {
        disabledPositions.push(i);
      }
    }
    return disabledPositions;
  }

  adaptNewState(newState: CheckboxState[], oldState: CheckboxState[]) {
    const tempState = [...newState];
    let countChecked = 0;
    let countUnchecked = 0;

    if (newState[0].disabled) {
      tempState.forEach((checkbox) => {
        checkbox.disabled = true;
      });
    }
    if (newState[0].checked !== oldState[0]?.checked) {
      const isMasterChecked = newState[0].checked;
      if (isMasterChecked) {
        this.groupStatus = this.getGroupStatus(
          newState,
          tempState,
          countChecked,
          true
        );
      } else {
        this.groupStatus = this.getGroupStatus(
          newState,
          tempState,
          countUnchecked,
          false
        );
      }
    } else {
      for (let i = 1; i < newState.length; i++) {
        tempState[i].checked = newState[i].checked;
        if (newState[i].checked) {
          countChecked += 1;
        } else {
          countUnchecked += 1;
        }
      }
      this.setMasterIndeterminateStatus(
        newState,
        tempState,
        countChecked,
        countUnchecked
      );
      this.groupStatus = tempState;
      countUnchecked = 0;
      countChecked = 0;
    }
  }

  setMasterIndeterminateStatus(
    newState: CheckboxState[],
    tempState: CheckboxState[],
    countChecked: number,
    countUnchecked: number
  ) {
    let disabledCheckedCount = this.getDisabledCheckBoxes(newState, true)
      .length;
    let disabledUnCheckedCount = this.getDisabledCheckBoxes(newState, false)
      .length;

    if (countChecked + disabledUnCheckedCount === newState.length - 1) {
      tempState[0].checked = true;
      this.masterIndeterminate = false;
    } else if (countUnchecked + disabledCheckedCount === newState.length - 1) {
      tempState[0].checked = false;
      this.masterIndeterminate = false;
    } else {
      tempState[0].checked = false;
      this.masterIndeterminate = true;
    }
  }

  handleCheckboxGroupStatus() {
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
