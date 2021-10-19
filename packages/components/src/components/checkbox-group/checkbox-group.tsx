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
  Prop,
  State,
} from '@stencil/core';
import { CheckboxInterface } from '../checkbox/checkbox';

@Component({
  tag: 'scale-checkbox-group',
  styleUrl: './checkbox-group.css',
  shadow: false,
})
export class CheckboxGroup {
  @Element() host: HTMLElement;

  /** (optional) Input name */
  @Prop() name?: string;
  /** (optional) Input label */
  @Prop() label: string = '';
  /** (optional) Input label output */
  @Prop() ariaLabel?: string;
  /** (optional) Input helper text */
  @Prop() helperText?: string;
  /** (optional) Input status */
  @Prop() status?: string = '';
  /** (optional) Input value */
  @Prop() value?: string = '';
  /** (optional) Input checkbox id */
  @Prop({ mutable: true }) inputId?: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  @Prop() selectText?: string = 'Select all';
  @Prop() unselectText?: string = 'Unselect all';

  @State() checked;
  @State() indeterminate;
  @State() disabled;

  private groupNode;
  private actionText: string;

  @Listen('scaleChange')
  handleCheckboxChange(ev) {
    const el = ev.composedPath()[0];
    const { tagName, checked } = el;

    // make sure the event belongs to a scale checkbox
    if (tagName.toLowerCase() === 'scale-checkbox') {
      if (el !== this.groupNode) {
        this.updateParentCheckboxState();
      } else {
        this.updateChildrenCheckboxStates(checked);
        this.updateParentCheckboxState();
      }
    }
  }

  getChildNodes() {
    return Array.from(
      this.host.querySelector('fieldset').querySelectorAll('scale-checkbox')
    ) as CheckboxInterface[];
  }

  updateChildrenCheckboxStates(checked) {
    const childNodes = this.getChildNodes().filter((node) => !node.disabled);

    childNodes.forEach((node) => {
      if (checked !== undefined) {
        node.checked = checked;
        node.indeterminate = false;
      }
    });
  }

  updateParentCheckboxState() {
    const childNodes = this.getChildNodes();

    const checked = childNodes?.map((childNode) => childNode.checked);
    const indeterminate = childNodes?.map(
      (childNode) => childNode.indeterminate
    );
    const disabled = childNodes?.map((childNode) => childNode.disabled);

    const allChecked = checked.every(Boolean);
    const someChecked = checked.some(Boolean);

    const someIndeterminate = indeterminate.some(Boolean);

    const allDisabled = disabled.every(Boolean);

    this.checked = allChecked || someChecked;
    this.indeterminate = someIndeterminate || (someChecked && !allChecked);
    this.disabled = allDisabled;
    this.actionText = allChecked ? this.unselectText : this.selectText;
  }

  render() {
    return (
      <Host class="checkbox-group">
        <scale-checkbox
          ref={(el) => (this.groupNode = el)}
          name={this.name}
          label={this.label}
          ariaLabel={`${this.ariaLabel || this.label} - ${this.actionText}`}
          helperText={this.helperText}
          status={this.status}
          value={this.value}
          inputId={this.inputId}
          checked={this.checked}
          indeterminate={this.indeterminate}
          disabled={this.disabled}
          part="parent-checkbox"
        />
        <fieldset part="fieldset">
          <legend>{this.ariaLabel || this.label}</legend>
          <slot />
        </fieldset>
      </Host>
    );
  }

  componentDidLoad() {
    this.updateParentCheckboxState();
  }
}
