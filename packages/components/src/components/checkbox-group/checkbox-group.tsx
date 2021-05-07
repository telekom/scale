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
	masterIndeterminate = false;
	@State() groupStatus = [];
	@Element() hostElement: HTMLElement;
	@Listen('scaleChange')
	scaleChangeHandler() {
	  // console.log('this.masterChangedListener', this.masterChanged)
	  this.masterChanged = false;
	  this.setGroupStatusState();
	}
  
	@Watch('groupStatus')
	watchHandler(newValue, oldValue) {
	  // console.log('status watcher called');
	  if (this.objDiffer(oldValue, newValue) || this.initialLoad) {
		/* console.log('objects differ, this.initialLoad = ', this.initialLoad);
		console.log('The old value of groupStatus is: ', oldValue);
		console.log('The new value of groupStatus is: ', newValue); */
		if (oldValue[0] || this.initialLoad) {
		  // console.log('new vs old: ', newValue[0], oldValue[0]);
		  this.masterChanged = true;
		  // console.log('masterChanged: ', this.masterChanged);
		  this.initialLoad = false;
		  this.adaptNewState(newValue, oldValue);
		}
		this.handleCheckboxGroupStatus();
		this.callFuncOnStateChange = true;
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
	  const newState = [];
	  for (let i = 0; i < checkboxes.length; i++) {
		newState[i] = {
		  id: checkboxes[i].inputId,
		  checked: checkboxes[i].checked,
		  disabled: checkboxes[i].disabled ? checkboxes[i].disabled : false,
		};
	  }
	  this.groupStatus = newState;
	}
  
	adaptNewState(newState, oldState) {
	  // console.log(' adaptNewState() called');
	  const tempState = [...newState];
	  let countChecked = 0;
	  let countUnchecked = 0;
	  if (newState[0].checked !== oldState[0]?.checked) {
		const isMasterChecked = newState[0].checked;
		// new master checked
		if (isMasterChecked) {
		  // console.log('master is checked');
		  for (let i = 0; i < newState.length; i++) {
			if (!newState[i].disabled) {
			  newState[i].checked = true;
			  tempState[i].checked = true;
			  countChecked += 1;
			}
			if (newState[i].disabled && newState[i].checked) {
			  countChecked += 1;
			}
		  }
		  if (countChecked < newState.length) {
			this.masterIndeterminate = true;
			tempState[0].checked = false;
			countChecked = 0;
		  }
		  this.groupStatus = tempState;
		} else {
		  // console.log('master is not checked');
		  // new master unchecked and maybe indeterminate
		  for (let i = 0; i < newState.length; i++) {
			if (!newState[i].disabled) {
			  newState[i].checked = false;
			  tempState[i].checked = false;
			  countUnchecked += 1;
			}
			if (newState[i].disabled && !newState[i].checked) {
			  countUnchecked += 1;
			}
		  }
		  if (countUnchecked < newState.length) {
			this.masterIndeterminate = true;
			countUnchecked = 0;
		  }
		  this.groupStatus = tempState;
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
		if (countChecked === newState.length - 1) {
		  tempState[0].checked = true;
		  this.masterIndeterminate = false;
		} else if (countUnchecked === newState.length - 1) {
		  tempState[0].checked = false;
		  this.masterIndeterminate = false;
		} else {
		  this.masterIndeterminate = true;
		  tempState[0].checked = false;
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
			// console.log('this.masterIndeterminate === true');
			checkboxes[0].setAttribute('indeterminate', 'true');
			checkboxes[0].checked = false;
			this.masterIndeterminate = false;
		  } else {
			// console.log('this.masterIndeterminate === false');
			checkboxes[0].removeAttribute('indeterminate');
			checkboxes[0].checked = this.groupStatus[0].checked;
		  }
		} else {
		  checkboxes[i].checked = this.groupStatus[i].checked;
		  checkboxes[i].disabled = this.groupStatus[i].disabled;
		}
	  }
	}
  
	objectsEqual = (o1, o2) => {
	  return typeof o1 === 'object' && Object.keys(o1).length > 0
		? Object.keys(o1).length === Object.keys(o2).length &&
			Object.keys(o1).every((p) => this.objectsEqual(o1[p], o2[p]))
		: o1 === o2;
	};
  
	objDiffer(obj1, obj2) {
	  let isEqual = false;
	  for (let i = 0; i < obj1.length; i++) {
		if (!this.objectsEqual(obj1[i], obj2[i])) {
		  isEqual = true;
		  break;
		}
	  }
	  return isEqual;
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