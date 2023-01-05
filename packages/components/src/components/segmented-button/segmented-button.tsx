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
  Prop,
  h,
  Host,
  Element,
  State,
  Listen,
  Event,
  EventEmitter,
  Watch,
} from '@stencil/core';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';

interface SegmentStatus {
  id: string;
  selected: boolean;
}

const CHECKMARK_WIDTH_SMALL = 14;
const CHECKMARK_WIDTH_LARGE = 18;

@Component({
  tag: 'scale-segmented-button',
  styleUrl: 'segmented-button.css',
  shadow: true,
})
export class SegmentedButton {
  /** segment position within button */
  position = 0;

  slottedSegments = 0;

  @Element() hostElement: HTMLElement;
  /** state */
  @State() status: SegmentStatus[] = [];
  /** (optional) The size of the button */
  @Prop() size?: 'small' | 'medium' | 'large' = 'small';
  /** (optional) Allow more than one button to be selected */
  @Prop() multiSelect: boolean = false;
  /** (optional) If `true`, the button is disabled */
  @Prop({ reflect: true }) disabled?: boolean = false;
  /** (optional) If `true`, expand to container width */
  @Prop() fullWidth?: boolean = false;
  /** (optional) If `true`, show error message */
  @Prop() invalid?: boolean = false;
  /** (optional) If `true`, show error message */
  @Prop() helperText?: string = 'Please select an option';
  /** (optional) Button label */
  @Prop() label?: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  /** (optional) aria-label attribute needed for icon-only buttons */
  @Prop()
  ariaLabelTranslation = `segment button with $slottedSegments`;
  @Prop({ mutable: true })
  longestButtonWidth: string;
  /** Emitted when button is clicked */
  @Event({ eventName: 'scale-change' }) scaleChange: EventEmitter;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleChange' }) scaleChangeLegacy: EventEmitter;

  container: HTMLElement;
  showHelperText = false;
  @Listen('scaleClick')
  scaleClickHandler(ev: { detail: { id: string; selected: boolean } }) {
    let tempState: SegmentStatus[];
    if (!this.multiSelect) {
      if (!ev.detail.selected) {
        tempState = this.status.map((obj) =>
          ev.detail.id === obj.id ? ev.detail : { ...obj }
        );
        /* clicked button has now selected state */
      } else {
        tempState = this.status.map((obj) =>
          ev.detail.id === obj.id ? ev.detail : { ...obj, selected: false }
        );
      }
    } else {
      tempState = this.status.map((obj) =>
        ev.detail.id === obj.id ? ev.detail : { ...obj }
      );
    }
    this.setState(tempState);
  }

  @Watch('disabled')
  @Watch('size')
  handlePropsChange() {
    this.propagatePropsToChildren();
  }

  /**
   * Keep props, needed in children buttons, in sync
   */
  propagatePropsToChildren() {
    this.getAllSegmentedButtons().forEach((el) => {
      el.setAttribute('size', this.size);
      if (this.disabled) {
        el.setAttribute('disabled', true && 'disabled');
      }
    });
  }

  componentDidLoad() {
    const tempState: SegmentStatus[] = [];
    const segmentedButtons = this.getAllSegmentedButtons();
    this.slottedSegments = segmentedButtons.length;
    const longestButtonWidth = this.getLongestButtonWidth();
    segmentedButtons.forEach((SegmentedButton) => {
      this.position++;
      tempState.push({
        id: SegmentedButton.getAttribute('segment-id'),
        selected: SegmentedButton.hasAttribute('selected'),
      });
      SegmentedButton.setAttribute('position', this.position.toString());
      SegmentedButton.setAttribute(
        'aria-description-translation',
        '$position $selected'
      );
    });
    // @ts-ignore
    // this.container.style = `grid-template-columns: ${`minmax(0, ${Math.ceil(longestButtonWidth)}px) `.repeat(this.hostElement.children.length)};`;
    this.container.style = `grid-template-columns: repeat(${
      this.hostElement.children.length
    }, ${Math.ceil(longestButtonWidth)}px);`;

    this.propagatePropsToChildren();
    this.position = 0;
    this.status = tempState;
    this.setState(tempState);
  }

  componentWillUpdate() {
    this.showHelperText = false;
    if (
      this.invalid &&
      this.status.filter((e) => e.selected === true).length <= 0
    ) {
      this.showHelperText = true;
    }
  }

  getAdjacentSiblings = (tempState, i) => {
    let adjacentSiblings = '';
    if (i !== 0 && tempState[i].selected && tempState[i - 1].selected) {
      adjacentSiblings = 'left';
    }
    if (
      i !== tempState.length - 1 &&
      tempState[i].selected &&
      tempState[i + 1].selected
    ) {
      adjacentSiblings = `${
        adjacentSiblings ? adjacentSiblings + ' right' : 'right'
      }`;
    }
    return adjacentSiblings;
  };

  // all segmented buttons should have the same width, based on the largest one
  getLongestButtonWidth() {
    let tempWidth = 0;
    Array.from(this.hostElement.children).forEach((child) => {
      const selected = child.hasAttribute('selected');
      const iconOnly = child.hasAttribute('icon-only');
      const checkmark =
        this.size === 'small' ? CHECKMARK_WIDTH_SMALL : CHECKMARK_WIDTH_LARGE;
      if (selected || iconOnly) {
        tempWidth =
          child.getBoundingClientRect().width > tempWidth
            ? child.getBoundingClientRect().width
            : tempWidth;
      } else {
        tempWidth =
          child.getBoundingClientRect().width + checkmark > tempWidth
            ? child.getBoundingClientRect().width + checkmark
            : tempWidth;
      }
    });
    return tempWidth;
  }

  setState(tempState: SegmentStatus[]) {
    const segmentedButtons = Array.from(
      this.hostElement.querySelectorAll('scale-segment')
    );
    segmentedButtons.forEach((segmentedButton, i) => {
      segmentedButton.setAttribute(
        'adjacent-siblings',
        this.getAdjacentSiblings(tempState, i)
      );
      segmentedButton.setAttribute(
        'selected',
        tempState[i].selected ? 'true' : 'false'
      );
    });
    this.status = tempState;
    emitEvent(this, 'scaleChange', this.status);
  }

  getAllSegmentedButtons() {
    return Array.from(this.hostElement.querySelectorAll('scale-segment'));
  }

  getAriaLabelTranslation() {
    const filledText = this.ariaLabelTranslation.replace(
      /\$slottedSegments/g,
      `${this.slottedSegments}`
    );
    return filledText;
  }

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        {this.label && (
          <span class="segmented-button--label"> {this.label} </span>
        )}
        <div
          class={this.getCssClassMap()}
          part={this.getBasePartMap()}
          aria-label={this.getAriaLabelTranslation()}
          role="group"
          ref={(el) => (this.container = el as HTMLInputElement)}
        >
          <slot />
        </div>
        {this.showHelperText && (
          <scale-helper-text
            class="segmented-button--helper-text"
            helperText={this.helperText}
            variant={'danger'}
          ></scale-helper-text>
        )}
      </Host>
    );
  }

  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }

  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }

  getCssOrBasePartMap(mode: 'basePart' | 'css') {
    const prefix = mode === 'basePart' ? '' : 'segmented-button--';

    return classNames(
      'segmented-button',
      this.size && `${prefix}${this.size}`,
      this.fullWidth && `${prefix}full-width`
    );
  }
}
