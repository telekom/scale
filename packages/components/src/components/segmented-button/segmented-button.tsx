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
const CHECKMARK_WIDTH_MEDIUM = 18 + 12;
const CHECKMARK_WIDTH_LARGE = 20 + 18;

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
  /** (optional) The size of the button */
  @Prop() size?: 'small' | 'medium' | 'large' = 'small';
  /** (optional) Allow more than one button to be selected */
  @Prop() multiSelect: boolean = false;
  /** (optional) the index of the selected segment */
  @Prop({ mutable: true }) selectedIndex?: number;
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
  /** Emitted when button is clicked. Not emitted in case of programmatic state changes (e.g. the `selected` state is set by the skript). */
  @Event({ eventName: 'scale-change' }) scaleChange: EventEmitter;

  container: HTMLElement;
  showHelperText = false;
  @Listen('scale-click')
  scaleClickHandler(
    ev: CustomEvent<{
      id: string;
      selected: boolean;
      userInteraction?: boolean;
    }>
  ) {
    const { userInteraction = true } = ev.detail; // set default to true, which leads to emit the scaleChange-event finally
    let tempState = this.getAllSegments().map((segment) => {
      return {
        id: segment.segmentId,
        selected: segment.selected,
      };
    });
    if (!this.multiSelect) {
      if (!ev.detail.selected) {
        tempState = tempState.map((obj) =>
          ev.detail.id === obj.id ? ev.detail : { ...obj }
        );
      } else {
        tempState = tempState.map((obj) =>
          ev.detail.id === obj.id ? ev.detail : { ...obj, selected: false }
        );
      }
      this.setState(tempState, userInteraction && ev.detail.selected);
    } else {
      this.setState(tempState, userInteraction);
    }
  }

  @Watch('disabled')
  @Watch('size')
  @Watch('selectedIndex')
  handlePropsChange() {
    this.propagatePropsToChildren();
  }

  /**
   * Keep props, needed in children buttons, in sync
   */
  propagatePropsToChildren() {
    this.getAllSegments().forEach((segment) => {
      segment.size = this.size;
      segment.selectedIndex = this.selectedIndex;
      if (this.disabled) {
        segment.disabled = true;
      }
    });
  }

  componentWillLoad() {
    const tempState: SegmentStatus[] = [];
    const segments = this.getAllSegments();
    this.slottedSegments = segments.length;
    segments.forEach((segment, i) => {
      tempState.push({
        id: segment.segmentId,
        selected: segment.selected,
      });
      segment.position = i;
      segment.ariaDescriptionTranslation = '$position $selected';
    });
    this.setState(tempState, false);
    this.showHelperText = this.shouldShowHelperText();
  }
  componentDidLoad() {
    const longestButtonWidth = this.getLongestButtonWidth();
    if (!this.fullWidth) {
      this.container.style.gridTemplateColumns = longestButtonWidth
        ? `repeat(${this.hostElement.children.length}, ${Math.ceil(
            longestButtonWidth
          )}px)`
        : `repeat(${this.hostElement.children.length}, auto)`;
    } else {
      this.container.style.display = 'flex';
    }
    this.propagatePropsToChildren();
  }

  componentWillUpdate() {
    this.showHelperText = this.shouldShowHelperText();
  }
  shouldShowHelperText() {
    let showHelperText = false;
    if (this.invalid && this.selectedIndex < 0) {
      showHelperText = true;
    }
    return showHelperText;
  }

  getSelectedIndex() {
    if (this.multiSelect) {
      // in multi-select having no selected segments is allowed
      return -1;
    } else {
      const allSegments = this.getAllSegments();
      const selectedIndex = allSegments.findIndex(
        (el: HTMLScaleSegmentElement) => el.selected === true
      );
      // we need to return -2 if no segment is selected
      return selectedIndex >= 0 ? selectedIndex : -2;
    }
  }

  getAdjacentSiblings = (tempState, i) => {
    let adjacentSiblings = null;
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
    Array.from(this.hostElement.children)
      .filter((child) => child.getBoundingClientRect().width)
      .forEach((child) => {
        const selected = child.hasAttribute('selected');
        const iconOnly = child.hasAttribute('icon-only');
        const checkmark =
          this.size === 'small'
            ? CHECKMARK_WIDTH_SMALL
            : this.size === 'medium'
            ? CHECKMARK_WIDTH_MEDIUM
            : CHECKMARK_WIDTH_LARGE;
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

  setState(tempState: SegmentStatus[], handleEvent: boolean = true) {
    const segments = Array.from(
      this.hostElement.querySelectorAll('scale-segment')
    );
    segments.forEach((segment, i) => {
      segment.adjacentSiblings = this.getAdjacentSiblings(tempState, i);
      segment.selected = tempState[i].selected;
    });
    this.selectedIndex = this.getSelectedIndex();
    if (handleEvent) {
      emitEvent(this, 'scale-change', { segments });
    }
  }

  getAllSegments() {
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
