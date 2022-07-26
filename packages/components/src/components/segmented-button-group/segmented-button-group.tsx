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
    // Watch,
  } from '@stencil/core';
  import classNames from 'classnames';
  import { emitEvent } from '../../utils/utils';
  
  interface ButtonStatus {
    id: string;
    selected: boolean;
  }
  
  @Component({
    tag: 'scale-segmented-button-group',
    styleUrl: 'segmented-button-group.css',
    shadow: true,
  })
  export class SegmentedButtonGroup {
    /** toggle button position within group */
    position = 0;

    slottedButtons = 0;

    @Element() hostElement: HTMLElement;
    /** state */
    @State() status: ButtonStatus[] = [];
    /** (optional) The size of the button, default is small */
    @Prop() size?: 'small' | 'large' | 'xl' = 'small';
    /** (optional) more than one button selected possible */
    @Prop() multiSelect: boolean = false;
    /** (optional) If `true`, the group is disabled */
    @Prop() disabled?: boolean = false;        
    /** (optional) Injected CSS styles */
    @Prop() styles?: string;
    /** (optional) aria-label attribute needed for icon-only buttons */
    @Prop()
    ariaLabelTranslation = `toggle button group with $slottedButtons buttons`;
    /** Emitted when button is clicked */
    @Event({ eventName: 'scale-change' }) scaleChange: EventEmitter;
    /** @deprecated in v3 in favor of kebab-case event names */
    @Event({ eventName: 'scaleChange' }) scaleChangeLegacy: EventEmitter;

    @Listen('scaleClick')
    scaleClickHandler(ev: { detail: { id: string; selected: boolean } }) {
      let tempState: ButtonStatus[];
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

  /**
   * Keep props, needed in children buttons, in sync
   */
   propagatePropsToChildren() {
    this.getAllToggleButtons().forEach((el) => {
      el.setAttribute('size', this.size);
      !el.getAttributeNames().includes('disabled') && el.setAttribute('disabled', this.disabled && 'disabled');
    });
  }    

    componentDidLoad() {
      const tempState: ButtonStatus[] = [];
      const toggleButtons = this.getAllToggleButtons();
      this.slottedButtons = toggleButtons.length;
      toggleButtons.forEach((toggleButton) => {
        // this.position++;
        tempState.push({
          id: toggleButton.getAttribute('segmented-button-id'),
          selected: toggleButton.hasAttribute('selected'),
        });
        // toggleButton.setAttribute('position', this.position.toString());
        toggleButton.setAttribute(
          'aria-description-translation',
          '$position $selected'
        );
      });
      this.propagatePropsToChildren();
      // this.position = 0;
      this.status = tempState;
      this.setState(tempState)
    }

    getAdjacentSiblings = (tempState, i) => {
      let adjacentSiblings = '';
      if (i != 0 && tempState[i].selected && tempState[i - 1].selected ) {
        adjacentSiblings = 'left'
       }
       if ( i != tempState.length - 1 && tempState[i].selected && tempState[i + 1].selected ) {
         adjacentSiblings = adjacentSiblings + 'right'
       }
      return adjacentSiblings;
    }

    setState(tempState: ButtonStatus[]) {
      const toggleButtons = Array.from(
        this.hostElement.querySelectorAll('scale-segmented-button')
      );
      toggleButtons.forEach((button, i) => {
        button.setAttribute('adjacent-siblings', this.getAdjacentSiblings(tempState, i))
        button.setAttribute('selected', tempState[i].selected ? 'true' : 'false');
      });
      this.status = tempState;
      emitEvent(this, 'scaleChange', this.status);
    }    
  
    getAllToggleButtons() {
      return Array.from(this.hostElement.querySelectorAll('scale-segmented-button'));
    }
    
    getAriaLabelTranslation() {
        const filledText = this.ariaLabelTranslation.replace(
          /\$slottedButtons/g,
          `${this.slottedButtons}`
        );
        return filledText;
      }

    render() {
      console.log('IN GROUP', this.multiSelect)
      return (
        <Host>
          {this.styles && <style>{this.styles}</style>}
          <div
            class={this.getCssClassMap()}
            part={this.getBasePartMap()}
            aria-label={this.getAriaLabelTranslation()}
            role="group"
          >
            <slot />
          </div>
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
      const prefix = mode === 'basePart' ? '' : 'segmented-button-group--';
  
      return classNames(
        'segmented-button-group',
        this.size && `${prefix}${this.size}`,
        // this.disabled && `${prefix}disabled`
      );
    }
  }
  