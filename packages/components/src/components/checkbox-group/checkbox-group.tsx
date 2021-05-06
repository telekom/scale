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

@Component({
  tag: 'scale-checkbox-group',
  styleUrl: './checkbox-group.css',
  shadow: true,
})
export class CheckboxGroup {

  masterChanged = false;
  callFuncOnStateChange = true;
  initialLoad = false;
  @State() groupStatus = [];
  @Element() hostElement: HTMLElement;
  @Listen('scaleChange')
  scaleChangeHandler() {
    // console.log('this.masterChangedListener', this.masterChanged)
    this.masterChanged = false;
    this.setGroupStatusState();
  }

  
  @Watch('groupStatus')
  watchHandler(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      // console.log('The old value of groupStatus is: ', oldValue);
      // console.log('The new value of groupStatus is: ', newValue);
      if (oldValue[0] && newValue[0].checked !== oldValue[0].checked) {
        // console.log('new vs old: ', newValue[0], oldValue[0]);
        this.masterChanged = true;
        // console.log('masterChanged: ', this.masterChanged);
      }
      if (this.callFuncOnStateChange) {
        this.handleCheckboxGroupStatus();
      }
      this.callFuncOnStateChange = true;
    }
  }

  componentDidLoad() {
    this.initialLoad = true;
    this.setGroupStatusState();
  }

  setGroupStatusState() {
    // console.log('setGroupStatusState() started');
    const newState = [];
    const checkboxes = Array.from(
      this.hostElement.querySelectorAll('scale-checkbox')
    );
    for (let i = 0; i < checkboxes.length; i++) {
      newState[i] = {
        id: checkboxes[i].inputId,
        checked: checkboxes[i].checked,
        disabled: checkboxes[i].disabled ? checkboxes[i].disabled : false,
      };
    }
    this.groupStatus = newState;
  }

  handleCheckboxGroupStatus() {
    // console.log('handleCheckboxGroupStatus() started');
    const checkboxes = Array.from(
      this.hostElement.querySelectorAll('scale-checkbox')
    );
    const master = checkboxes[0];
    let countChecked = 0;
    let countUnchecked = 0;

    if (this.initialLoad) {
      // console.log('this.initialLoad', this.initialLoad);
      if (master.checked) {
        // master.setAttribute('checked', 'true');
        checkboxes.forEach((checkbox) => {
          if (!checkbox.disabled) {
            checkbox.checked = true;
            countChecked += 1;
          }
          if (checkbox.disabled && checkbox.checked) {
            countChecked += 1;
          }
        });
        // console.log('countChecked', countChecked);
        if (countChecked < checkboxes.length) {
          master.setAttribute('indeterminate', 'true');
          master.removeAttribute('checked');
          countChecked = 0;
        }
      } else {
        master.removeAttribute('checked');
        checkboxes.forEach((checkbox) => {
          if (!checkbox.disabled) {
            checkbox.checked = false;
            countUnchecked += 1;
          }
          if (checkbox.disabled && !checkbox.checked) {
            countUnchecked += 1;
          }
        });
        // console.log('countUnchecked', countUnchecked);
        if (countUnchecked < checkboxes.length) {
          master.setAttribute('indeterminate', 'true');
          master.removeAttribute('checked');
          countUnchecked = 0;
        }
      }
      if (master.disabled) {
        checkboxes.forEach((checkbox) => {
          checkbox.disabled = true;
        });
      }
      this.callFuncOnStateChange = false;
      this.masterChanged = false;
      this.initialLoad = false;
      this.setGroupStatusState();
      return;
    }

    if (this.masterChanged) {
      // console.log('this.masterChanged', this.masterChanged);
      master.removeAttribute('indeterminate');
      if (master.checked) {
        // master.setAttribute('checked', 'true');
        checkboxes.forEach((checkbox) => {
          if (!checkbox.disabled) {
            checkbox.checked = true;
            countChecked += 1;
          }
          if (checkbox.disabled && checkbox.checked) {
            countChecked += 1;
          }
        });
        // console.log('countChecked', countChecked);
        if (countChecked < checkboxes.length) {
          master.setAttribute('indeterminate', 'true');
          master.removeAttribute('checked');
          countChecked = 0;
        }
      } else {
        master.removeAttribute('checked');
        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
      }
      this.callFuncOnStateChange = false;
      this.masterChanged = false;
      this.initialLoad = false;
      this.setGroupStatusState();
      return;
    }

    for (let i = 1; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        countChecked += 1;
      } else {
        countUnchecked += 1;
      }
    }
    // console.log('countChecked', countChecked);
    // console.log('countUnchecked', countUnchecked);

    if (countChecked === checkboxes.length - 1) {
      master.removeAttribute('indeterminate');
      master.checked = true;
      this.callFuncOnStateChange = false;
      this.setGroupStatusState();
      // console.log('all checked', this.groupStatus);
      return;
    }
    if (countUnchecked === checkboxes.length - 1) {
      master.removeAttribute('indeterminate');
      master.checked = false;
      this.callFuncOnStateChange = false;
      this.setGroupStatusState();
      // console.log('all not checked', this.groupStatus);
      return;
    }
    master.setAttribute('indeterminate', 'true');
    master.removeAttribute('checked');
    this.callFuncOnStateChange = false;
    this.setGroupStatusState();
    // console.log('not all checked', this.groupStatus);
  }

  change() {
    const checkboxes = Array.from(
      this.hostElement.querySelectorAll('scale-checkbox')
    );
    const master = checkboxes[0];
    master.disabled = !master.disabled;
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
